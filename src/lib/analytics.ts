import { sendGAEvent } from "@next/third-parties/google";

export const trackEvent = {
    provinceSelected: (province: string) => {
        sendGAEvent("event", "province_select", {
            province_name: province,
        });
    },

    dataRefreshed: () => {
        sendGAEvent("event", "data_refresh", { action: "click" });
    },

    mapZoomIn: () => {
        sendGAEvent("event", "map_interaction", { action: "zoom_in" });
    },

    mapZoomOut: () => {
        sendGAEvent("event", "map_interaction", { action: "zoom_out" });
    },

    mapCompassReset: () => {
        sendGAEvent("event", "map_interaction", { action: "compass_reset" });
    },

    mapLocate: () => {
        sendGAEvent("event", "map_interaction", { action: "locate_user" });
    },

    mapFullscreen: () => {
        sendGAEvent("event", "map_interaction", {
            action: "fullscreen_toggle",
        });
    },

    errorRetry: () => {
        sendGAEvent("event", "error_recovery", { action: "retry" });
    },

    footerLinkClick: (link: string) => {
        sendGAEvent("event", "footer_link_click", {
            link_target: link,
        });
    },
};
