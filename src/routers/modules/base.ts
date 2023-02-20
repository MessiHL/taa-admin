/*
 * @Description:
 * @Autor: hl
 * @Date: 2022-07-12 14:34:52
 * @LastEditors: hl
 * @LastEditTime: 2022-07-29 09:25:14
 */
import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";

const componentRouter: Array<RouteRecordRaw> = [
	{
		path: "/base",
		component: Layout,
		meta: {
			title: "常用组件"
		},
		children: [
			{
				path: "/base/table/useComponent",
				name: "useComponent",
				component: () => import("@/views/base/table/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "表格",
					key: "useComponent"
				}
			},
			{
				path: "/base/tree/index",
				name: "treeDemo",
				component: () => import("@/views/base/tree/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "树",
					key: "treeDemo"
				}
			},
			{
				path: "/base/layout/index",
				name: "layoutDemo",
				component: () => import("@/views/base/layout/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "布局",
					key: "layoutDemo"
				}
			},
			{
				path: "/base/tabs/index",
				name: "tabsDemo",
				component: () => import("@/views/base/tabs/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "tabs",
					key: "tabsDemo"
				}
			}
		]
	}
];
export default componentRouter;
