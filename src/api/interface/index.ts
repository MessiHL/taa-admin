/*
 * @Description:
 * @Autor: hl
 * @Date: 2022-07-12 17:20:29
 * @LastEditors: hl
 * @LastEditTime: 2022-07-18 15:37:05
 */
// 请求响应参数（不含data）
export interface Result {
	code: string;
	msg: string;
	status_code?: string;
}

// 请求响应参数（含有data）
export interface ResultData<T = any> extends Result {
	data?: T;
}

// 分页响应参数
export interface ResPage<T> {
	data: T[];
	page_size: number;
	current_page: number;
	total: number;
}

// 分页请求参数
export interface ReqPage {
	current_page: number;
	page_size: number;
}
