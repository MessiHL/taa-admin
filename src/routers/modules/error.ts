/*
 * @Description:
 * @Autor: hl
 * @Date: 2022-07-12 14:12:20
 * @LastEditors: hl
 * @LastEditTime: 2022-07-18 11:01:46
 */
import { RouteRecordRaw } from "vue-router";

// 错误页面模块
const errorRouter: Array<RouteRecordRaw> = [
	{
		path: "/403",
		name: "403",
		component: () => import("@/components/ErrorMessage/403.vue"),
		meta: {
			requiresAuth: true,
			title: "403页面",
			key: "403"
		}
	},
	{
		path: "/404",
		name: "404",
		component: () => import("@/components/ErrorMessage/404.vue"),
		meta: {
			requiresAuth: false,
			title: "404页面",
			key: "404"
		}
	},
	{
		path: "/500",
		name: "500",
		component: () => import("@/components/ErrorMessage/500.vue"),
		meta: {
			requiresAuth: false,
			title: "500页面",
			key: "500"
		}
	}
];

export default errorRouter;
