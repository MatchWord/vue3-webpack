import SvgIcon from "./index.vue";

// 全局注册 svg 组件
export function setupSvgIcon(app) {
  app.component("svg-icon", SvgIcon);
  // 工程导入svg图片
  const req = require.context("../../assets/icons", false, /\.svg$/);
  const requireAll = (requireContext) =>
    requireContext.keys().map(requireContext);

  requireAll(req);
}
