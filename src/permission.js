import router from "@/router";
import { useUserStoreHook } from "@/store/modules/user";
import { usePermissionStoreHook } from "@/store/modules/permission";

import NProgress from "nprogress"; // 进度条插件
import "nprogress/nprogress.css"; // 进度条样式

NProgress.configure({ showSpinner: false }); // 进度条配置文件

const permissionStore = usePermissionStoreHook();

// 白名单路由
const whiteList = ["/login"]; // 没有重定向白名单

router.beforeEach(async (to, from, next) => {
  // 进度条开始
  NProgress.start();
  // 确定用户是否已登录
  const hasToken = localStorage.getItem("accessToken");
  if (hasToken) {
    if (to.path === "/login") {
      // 如果已登录，跳转首页
      next({ path: "/" });
      NProgress.done();
    } else {
      // 确定用户是否通过getinfo获取了权限角色
      const userStore = useUserStoreHook();
      const hasRoles = userStore.user.roles && userStore.user.roles.length > 0;
      if (hasRoles) {
        // 未匹配到任何路由，跳转404
        if (to.matched.length === 0) {
          from.name ? next({ name: from.name }) : next("/404");
        } else {
          next();
        }
      } else {
        try {
          const { roles } = await userStore.getUserInfo();
          const accessRoutes = await permissionStore.generateRoutes(roles);
          accessRoutes.forEach((route) => {
            router.addRoute(route);
          });
          next({ ...to, replace: true });
        } catch (error) {
          // 移除 token 并跳转登录页
          await userStore.resetToken();
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    // 未登录可以访问白名单页面
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
