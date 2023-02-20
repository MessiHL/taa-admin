/*
 * @Description:
 * @Autor: hl
 * @Date: 2022-07-12 16:44:01
 * @LastEditors: hl
 * @LastEditTime: 2022-07-29 09:40:18
 */
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/config/serviceLoading";
import { AxiosCanceler } from "./helper/axiosCancel";
import { ResultData } from "@/api/interface";
import { ResultEnum } from "@/enums/httpEnum";
import { checkResponseStatus, checkAxiosErrorCode } from "./helper/checkAxiosError";
import { ElMessage, ElMessageBox } from "element-plus";
import { GlobalStore } from "@/store";
import router from "@/routers";
const axiosCanceler = new AxiosCanceler();

const config: AxiosRequestConfig = {
	// 默认地址请求地址，可在 .env 开头文件中修改
	baseURL: import.meta.env.VITE_API_URL as string,
	// 设置超时时间（30s）
	timeout: ResultEnum.TIMEOUT as number,
	// 表示跨域请求时是否需要使用凭证
	withCredentials: false
};
class RequestHttp {
	service: AxiosInstance;
	public constructor(config: AxiosRequestConfig) {
		// 实例化axios
		this.service = axios.create(config);

		/**
		 * @description 请求拦截器
		 * 客户端发送请求 -> [请求拦截器] -> 服务器
		 * token校验(JWT) : 接受服务器返回的token,存储到vuex/本地储存当中
		 */
		this.service.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				// * 将当前请求添加到 pending 中
				axiosCanceler.addPending(config);
				// * 如果当前请求不需要显示 loading,在api服务中通过指定的第三个参数: { headers: { noLoading: true } }来控制不显示loading，参见loginApi
				config.headers!.noLoading || showFullScreenLoading();
				// 开发环境，添加userInfo
				if (process.env.NODE_ENV === "development") {
					const headers = {
						userInfo:
							"eyJwd2Rfc3RhdHVzIjoiMCIsInRlbmFudF9pZCI6IjUzMDAwMDAwMCIsIklQIjoiMTkyLjE2OC4xLjYzIiwib3JnX3R5cGVfaWQiOiIzNSIsInRlbGVwaG9uZSI6bnVsbCwidXNlclR5cGUiOiIyIiwiU04iOiI1MzIzMDY5IiwidXNlck5hbWUiOiLmnY7miJDoirMiLCJ1c2VySWQiOiI1Mzg1NDciLCJidXNpWWVhciI6IjIwMjIiLCJ1c2VyQ29kZSI6IjEwNzAwNDAwMiIsInJlZ2lvbl9jb2RlIjoiNzlCMDQ1RUYtMEY2Mi00NkY2LTgzMEQtMjk4OEI5NDhFQTg0In0="
					};
					return { ...config, headers };
				} else {
					return { ...config };
				}

				// const globalStore = GlobalStore();
				// const token: string = globalStore.token;
				// return { ...config, headers: { "x-access-token": token } };
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);

		/**
		 * @description 响应拦截器
		 *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
		 */
		this.service.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data, config } = response;
				const globalStore = GlobalStore();
				// * 在请求结束后，移除本次请求
				axiosCanceler.removePending(config);
				tryHideFullScreenLoading();
				// * 登陆失效（code == 599）
				if (Number(data.status_code) == ResultEnum.OVERDUE) {
					ElMessage.error(data.msg);
					globalStore.setToken("");
					router.replace({
						path: "/login"
					});
					return Promise.reject(data);
				}
				// * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
				if (data.status_code && Number(data.status_code) !== ResultEnum.SUCCESS && data.status_code !== ResultEnum.SUCCESS2) {
					if (data.reason) {
						ElMessageBox.alert(data.reason, "提示", {
							confirmButtonText: "确定",
							type: "warning"
						});
					} else {
						ElMessage.error("请求失败！");
					}

					return Promise.reject(data);
				}

				return data;
			},
			async (error: AxiosError) => {
				tryHideFullScreenLoading();
				if (error.code) {
					return checkAxiosErrorCode(error.code);
				}

				// 根据响应的错误状态码，做不同的处理
				const { response } = error;
				if (response) return checkResponseStatus(response.status);
				// 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
				if (!window.navigator.onLine) return router.replace({ path: "/500" });
				return Promise.reject(error);
			}
		);
	}

	// * 常用请求方法封装
	get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.get(url, { params, ..._object });
	}
	post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.post(url, params, _object);
	}
	put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.put(url, params, _object);
	}
	delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
		return this.service.delete(url, { params, ..._object });
	}
}

export default new RequestHttp(config);
