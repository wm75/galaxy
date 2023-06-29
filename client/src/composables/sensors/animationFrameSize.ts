import { resolveUnref, type MaybeComputedRef } from "@vueuse/core";
import { ref } from "vue";

import { useAnimationFrameResizeObserver } from "./animationFrameResizeObserver";

export function useAnimationFrameSize(target: MaybeComputedRef<HTMLElement | null>) {
    const width = ref(0);
    const height = ref(0);

    useAnimationFrameResizeObserver(target, () => {
        const el = resolveUnref(target);

        if (!el) {
            return;
        }

        width.value = el.offsetWidth;
        height.value = el.offsetHeight;
    });

    return {
        width,
        height,
    };
}
