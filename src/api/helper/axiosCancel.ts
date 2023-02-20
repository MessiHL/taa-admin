/*
 * @Description:
 * @Autor: hl
 * @Date: 2022-07-12 16:52:23
 * @LastEditors: hl
 * @LastEditTime: 2022-07-12 17:19:37
 */
import axios, { AxiosRequestConfig, Canceler } from "axios";
import { isFunction } from "@/utils/is";
import qs from "qs";
let pendingMap = new Map<string, Canceler>();

// * 序列化参数
export const getPendingUrl = (config: AxiosRequestConfig) =>
	[config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join("&");

/**
 * @description: 添加请求
 * @param {Object} config
 * @return void
 */
export class AxiosCanceler {
	addPending(config: AxiosRequestConfig) {
		// * 在请求开始前，对之前的请求做检查取消操作
		this.removePending(config);
		const url = getPendingUrl(config);
		config.cancelToken =
			config.cancelToken ||
			new axios.CancelToken(cancel => {
				if (!pendingMap.has(url)) {
					// 如果 pending 中不存在当前请求，则添加进去
					pendingMap.set(url, cancel);
				}
			});
	}

	/**
	 * @description: 移除请求
	 * @param {Object} config
	 */
	removePending(config: AxiosRequestConfig) {
		const url = getPendingUrl(config);
		if (pendingMap.has(url)) {
			const cancel = pendingMap.get(url);
			cancel && cancel();
			pendingMap.delete(url);
		}
	}

	/**
	 * @description: 清空所有pending
	 */
	removeAllPending() {
		pendingMap.forEach(cancel => {
			cancel && isFunction(cancel) && cancel();
		});

		pendingMap.clear();
	}
	/**
	 * @description: 重置
	 */
	reset(): void {
		pendingMap = new Map<string, Canceler>();
	}
}
