/*
 * @Description:
 * @Autor: hl
 * @Date: 2022-07-12 14:12:04
 * @LastEditors: hl
 * @LastEditTime: 2022-07-18 10:59:47
 */
import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";

const apiRouter: Array<RouteRecordRaw> = [
	{
		path: "/base",
		component: Layout,
		redirect: "/base/api/index",
		meta: {
			title: "http"
		},
		children: [
			{
				path: "/base/api/index",
				name: "ApiTest",
				component: () => import("@/views/base/api/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "test",
					key: "ApiTest"
				}
			}
		]
	}
];

export default apiRouter;
