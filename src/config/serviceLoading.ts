/*
 * @Description:全局请求 loading(服务方式调用)
 * @Autor: hl
 * @Date: 2022-07-12 16:44:24
 * @LastEditors: hl
 * @LastEditTime: 2022-07-12 16:51:26
 */
import { ElLoading } from "element-plus";

let loadingInstance: ReturnType<typeof ElLoading.service>;
const startLoading = () => {
	loadingInstance = ElLoading.service({
		fullscreen: true,
		lock: true,
		text: "正在查询数据，请稍候...",
		background: "rgba(0, 0, 0, 0.7)"
	});
};

const endLoading = () => {
	loadingInstance.close();
};

// showFullScreenLoading() tryHideFullScreenLoading() 要做的事就是将同一时刻的请求合并。
// 声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
// 调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0;
export const showFullScreenLoading = () => {
	if (needLoadingRequestCount === 0) {
		startLoading();
	}
	needLoadingRequestCount++;
};

export const tryHideFullScreenLoading = () => {
	if (needLoadingRequestCount <= 0) return;
	needLoadingRequestCount--;
	if (needLoadingRequestCount === 0) {
		endLoading();
	}
};
