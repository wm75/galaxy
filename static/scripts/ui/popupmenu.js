define("ui/popupmenu",["exports","jquery"],function(e,t){"use strict";function n(e,t){var n=e.data("menu_options");e.data("menu_options",t),n||e.bind("click.show_popup",function(t){return o(".popmenu-wrapper").remove(),setTimeout(function(){var n=o("<ul class='dropdown-menu' id='"+e.attr("id")+"-menu'></ul>"),i=e.data("menu_options");_.size(i)<=0&&o("<li>No Options.</li>").appendTo(n),o.each(i,function(e,t){if(t){var i=t.action||t;n.append(o("<li></li>").append(o("<a>").attr("href",t.url).html(e).click(i)))}else n.append(o("<li></li>").addClass("head").append(o("<a href='#'></a>").html(e)))});var p=o("<div class='popmenu-wrapper' style='position: absolute;left: 0; top: -1000;'></div>").append(n).appendTo("body"),u=t.pageX-p.width()/2;u=Math.min(u,o(document).scrollLeft()+o(window).width()-o(p).width()-5),u=Math.max(u,o(document).scrollLeft()+5),p.css({top:t.pageY,left:u})},10),setTimeout(function(){var e=function(e){o(e).bind("click.close_popup",function(){o(".popmenu-wrapper").remove(),e.unbind("click.close_popup")})};e(o(window.document)),e(o(window.top.document));for(var t=window.top.frames.length;t--;)e(o(window.top.frames[t].document))},50),!1})}Object.defineProperty(e,"__esModule",{value:!0});var o=function(e){return e&&e.__esModule?e:{default:e}}(t).default;e.default={make_popupmenu:n,make_popup_menus:function(e){e=e||document,o(e).find("div[popupmenu]").each(function(){var t={},i=o(this);i.find("a").each(function(){var e=o(this),n=e.get(0),i=n.getAttribute("confirm"),p=n.getAttribute("href"),u=n.getAttribute("target");t[e.text()]=p?{url:p,action:function(t){if(!i||confirm(i)){if(u)return window.open(p,u),!1;e.click()}else t.preventDefault()}}:null});var p=o(e).find("#"+i.attr("popupmenu"));p.find("a").bind("click",function(e){return e.stopPropagation(),!0}),n(p,t),p.addClass("popup"),i.remove()})}}});