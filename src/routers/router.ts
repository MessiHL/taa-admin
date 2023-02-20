/*
 * @Description:
 * @Autor: hl
 * @Date: 2022-07-11 15:19:51
 * @LastEditors: hl
 * @LastEditTime: 2022-07-18 14:22:31
 */

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// * 导入所有router
const metaRouters = import.meta.globEager("./modules/*.ts");

// * 处理路由表
export const routerArray: RouteRecordRaw[] = [];
Object.keys(metaRouters).forEach(item => {
	Object.keys(metaRouters[item]).forEach((key: any) => {
		routerArray.push(...metaRouters[item][key]);
	});
});

const routes: RouteRecordRaw[] = [
	// { path: "/", redirect: { name: "login" } },
	// {
	// 	path: "/login",
	// 	name: "login",
	// 	component: () => import("@/views/base/login/index.vue"),
	// 	meta: {
	// 		requiresAuth: false,
	// 		title: "登录页",
	// 		key: "login"
	// 	}
	// },

	// 默认首页
	{ path: "/", redirect: { name: "home" } },
	{
		path: "//home",
		name: "home",
		component: () => import("@/views/base/home/index.vue"),
		meta: {
			requiresAuth: false,
			title: "首页",
			key: "home"
		}
	},
	...routerArray
];

const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_BASE_ROUTE),
	routes,
	strict: false,
	// 切换页面，滚动到最顶部
	scrollBehavior: () => ({ left: 0, top: 0 })
});

export default router;
