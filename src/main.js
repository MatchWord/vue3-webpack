import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { setupStore } from "@/store";
import { setupDirective } from "@/directive";
import { setupSvgIcon } from "@/components/SvgIcon/index";

import "@/permission";

// 国际化
import i18n from "@/lang/index";

// 样式暗黑模式
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/styles/index.scss";
import "uno.css";

const app = createApp(App);
// 全局注册 自定义指令(directive)
setupDirective(app);
// 全局注册 状态管理(store)
setupStore(app);
// 全局注册 自定义svg图标(svg)
setupSvgIcon(app);

app.use(router).use(i18n).mount("#app");
