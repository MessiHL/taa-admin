/*
 * @Description:
 * @Autor: hl
 * @Date: 2022-07-11 17:16:11
 * @LastEditors: hl
 * @LastEditTime: 2022-07-18 14:25:02
 */
import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";

const homeRouter: Array<RouteRecordRaw> = [
	{
		path: "/home",
		component: Layout,
		redirect: "/home/index.vue",
		children: [
			{
				path: "index",
				name: "home",
				component: () => import("@/views/base/home/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "首页",
					key: "home"
				}
			}
		]
	}
];

export default homeRouter;
