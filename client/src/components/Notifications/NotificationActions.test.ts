import { setActivePinia } from "pinia";
import flushPromises from "flush-promises";
import { getLocalVue } from "@tests/jest/helpers";
import { createTestingPinia } from "@pinia/testing";
import { mount, type Wrapper } from "@vue/test-utils";

import NotificationActions from "./NotificationActions.vue";

import { useNotificationsStore } from "@/stores/notificationsStore";
import type { UserNotification } from "@/components/Notifications/index";
import { generateMessageNotification, generateNewSharedItemNotification } from "@/components/Notifications/test-utils";

const localVue = getLocalVue(true);

async function mouthNotificationActions() {
    const pinia = createTestingPinia();
    setActivePinia(pinia);

    const wrapper = mount(NotificationActions, {
        propsData: {
            notification: Math.random() > 0.5 ? generateMessageNotification() : generateNewSharedItemNotification(),
        },
        localVue,
        pinia,
        stubs: {
            AsyncButton: true,
            FontAwesomeIcon: true,
        },
    });

    const notificationsStore = useNotificationsStore();
    const spyOnUpdateNotification = jest.spyOn(notificationsStore, "updateNotification");
    spyOnUpdateNotification.mockImplementation(async (notification, changes) => {
        if (changes.deleted) {
            wrapper.setProps({
                notification: null,
            });
        } else {
            wrapper.setProps({
                notification: {
                    ...notification,
                    ...changes,
                },
            });
        }
    });

    await flushPromises();
    return { wrapper, spyOnUpdateNotification };
}

function updateSeenTime(
    wrapper: Wrapper<NotificationActions>,
    notification: UserNotification,
    newSeenTime: string | undefined = undefined
) {
    wrapper.setProps({
        notification: {
            ...notification,
            seen_time: newSeenTime,
        },
    });
}

describe("NotificationActions.vue", () => {
    it("mark as read", async () => {
        const { spyOnUpdateNotification, wrapper } = await mouthNotificationActions();

        updateSeenTime(wrapper, wrapper.props("notification"));

        await wrapper.vm.$nextTick();

        spyOnUpdateNotification.mockImplementation(async (notification) => {
            updateSeenTime(wrapper, notification, new Date().toISOString());
        });

        const markAsReadButton = wrapper.find("#mark-as-read-button");
        expect(markAsReadButton.exists()).toBe(true);
        await markAsReadButton.trigger("click");

        await wrapper.vm.$nextTick();

        expect(spyOnUpdateNotification).toHaveBeenCalled();
        expect(wrapper.find("#expiration-time-button").exists()).toBe(true);
    });

    it("delete notification", async () => {
        const { spyOnUpdateNotification, wrapper } = await mouthNotificationActions();

        const deleteButton = wrapper.find("#delete-button");
        expect(deleteButton.exists()).toBe(true);
        await deleteButton.trigger("click");

        await wrapper.vm.$nextTick();

        expect(spyOnUpdateNotification).toHaveBeenCalledTimes(1);
    });
});
