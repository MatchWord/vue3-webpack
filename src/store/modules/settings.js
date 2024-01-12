import { defineStore } from "pinia";
import defaultSettings from "@/settings";
import { useStorage } from "@vueuse/core";
import { ref } from "vue";
export const useSettingsStore = defineStore("setting", () => {
  // state
  const tagsView = useStorage("tagsView", defaultSettings.tagsView);

  const showSettings = ref(defaultSettings.showSettings);
  const sidebarLogo = ref(defaultSettings.sidebarLogo);

  const fixedHeader = useStorage("fixedHeader", defaultSettings.fixedHeader);

  const layout = useStorage("layout", defaultSettings.layout);
  const themeColor = useStorage("themeColor", defaultSettings.themeColor);

  const theme = useStorage("theme", defaultSettings.theme);

  // actions
  function changeSetting(param) {
    const { key, value } = param;
    switch (key) {
      case "showSettings":
        showSettings.value = value;
        break;
      case "fixedHeader":
        fixedHeader.value = value;
        break;
      case "tagsView":
        tagsView.value = value;
        break;
      case "sidevarLogo":
        sidebarLogo.value = value;
        break;
      case "layout":
        layout.value = value;
        break;
      case "themeColor":
        themeColor.value = value;
        break;
      case "theme":
        theme.value = value;
        if (theme.value === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        break;
    }
  }

  return {
    showSettings,
    tagsView,
    fixedHeader,
    sidebarLogo,
    layout,
    themeColor,
    changeSetting,
    theme,
  };
});
