/*
 * @Description:
 * @Autor: hl
 * @Date: 2022-07-11 15:18:31
 * @LastEditors: hl
 * @LastEditTime: 2022-07-18 14:40:49
 */
import router from "@/routers/router";
import { AuthStore } from "@/store/modules/auth";
import { AxiosCanceler } from "@/api/helper/axiosCancel";
import NProgress from "@/config/nprogress";
const axiosCanceler = new AxiosCanceler();
//  路由拦截
router.beforeEach((to, from, next) => {
	// 1  路由跳转前，清除当前所有请求
	axiosCanceler.removeAllPending();

	// 2 开启进度条
	NProgress.start();

	// 动态设置标题
	const title = import.meta.env.VITE_GLOB_APP_TITLE;
	document.title = to.meta.title ? `${title} - ${to.meta.title}` : title;

	// * TODO 判断是否有Token
	// const globalStore = GlobalStore();
	// if (!globalStore.token) {
	// 	next({
	// 		path: "/login"
	// 	});
	// 	NProgress.done();
	// 	return;
	// }

	// TODO 判断路由是否存在
	const authStore = AuthStore();
	// * Dynamic Router(动态路由，根据后端返回的菜单数据生成的一维数组)
	const dynamicRouter = authStore.dynamicRouter;
	// * Static Router(静态路由，必须配置首页地址，否则不能进首页获取菜单、按钮权限等数据)，获取数据的时候会loading，所有配置首页地址也没问题
	const routerList = dynamicRouter;
	if (routerList.indexOf(to.path) !== -1) {
		// 正常访问页面
		next();
	} else {
		next();
	}
});

router.afterEach(() => {
	// 跳转完成后续
	NProgress.done();
});

export default router;
