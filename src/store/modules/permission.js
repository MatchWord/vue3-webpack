import { ref } from "vue";
import { defineStore } from "pinia";
import { constantRoutes } from "@/router"; // 获取静态路由表
import { store } from "@/store";
import { listRoutes } from "@/api/system/menu"; // 获取动态路由的接口

const modules = require.context("../../views/", true, /\.vue/).keys();

const Layout = () => import("@/layout/index.vue");
/**
 * 通过meta.role 判断当前用户是否有权限
 *
 * @param roles 用户角色集合
 * @param route 路由
 * @returns
 */
const hasPermission = (roles, route) => {
  if (route.meta && route.meta.roles) {
    // 角色【超级管理员】拥有所有权限，忽略校验
    if (roles.includes("ROOT")) {
      return true;
    }
    return roles.some((role) => {
      if (route.meta?.roles !== undefined) {
        return route.meta.roles.includes(role);
      }
    });
  }
  return false;
};

/**
 * 递归过滤有权限的异步(动态)路由
 *
 * @param routes 接口返回的异步(动态)路由
 * @param roles 用户角色集合
 * @returns 返回用户有权限的异步(动态)路由
 */
const filterAsyncRoutes = (routes, roles) => {
  const asyncRoutes = [];

  routes.forEach((route) => {
    const tmpRoute = { ...route }; // ES6扩展运算符复制新对象
    if (!route.name) {
      tmpRoute.name = route.path;
    }
    // 判断用户(角色)是否有该路由的访问权限
    if (hasPermission(roles, tmpRoute)) {
      const component = tmpRoute.component;
      if (component == "Layout") {
        tmpRoute.component = Layout;
      } else {
        // tmpRoute.component = (resolve) =>
        //   require([`@/views/${component}`], resolve);
        if (modules.includes(`./${component}.vue`)) {
          tmpRoute.component = () => import(`@/views/${component}`);
        } else {
          tmpRoute.component = () => import(`@/views/error-page/404.vue`);
        }
      }
      if (tmpRoute.children) {
        tmpRoute.children = filterAsyncRoutes(tmpRoute.children, roles);
      }
      console.log("tmpRoute", tmpRoute);
      asyncRoutes.push(tmpRoute);
    }
  });
  // console.log("asyncRoutes", asyncRoutes);
  return asyncRoutes;
};

// setup
export const usePermissionStore = defineStore("permission", () => {
  // state
  const routes = ref([]);

  // actions
  function setRoutes(newRoutes) {
    routes.value = constantRoutes.concat(newRoutes);
  }
  /**
   * 生成动态路由
   *
   * @param roles 用户角色集合
   * @returns
   */
  function generateRoutes(roles) {
    return new Promise((resolve, reject) => {
      // 接口获取所有路由
      listRoutes()
        .then(({ data: asyncRoutes }) => {
          // 根据角色获取有访问权限的路由
          const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
          setRoutes(accessedRoutes);
          resolve(accessedRoutes);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * 混合模式左侧菜单
   */
  const mixLeftMenu = ref([]);
  function getMixLeftMenu(activeTop) {
    routes.value.forEach((item) => {
      if (item.path === activeTop) {
        mixLeftMenu.value = item.children || [];
      }
    });
  }
  return { routes, setRoutes, generateRoutes, getMixLeftMenu, mixLeftMenu };
});

// 非setup
export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
