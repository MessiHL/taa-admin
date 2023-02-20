import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/routers/constant";

const quoteRouter: Array<RouteRecordRaw> = [
	{
		path: "/bussiness",
		component: Layout,
		meta: {
			title: "报价管理"
		},
		children: [
			{
				path: "/taa/quote/priceSheet",
				name: "priceSheetList",
				component: () => import("@/views/taa/quote/priceSheet/list.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "报价",
					key: "priceSheetList"
				}
			}
		]
	}
];
export default quoteRouter;
