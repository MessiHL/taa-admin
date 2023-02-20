/*
 * @Description:
 * @Autor: hl
 * @Date: 2022-07-13 08:57:11
 * @LastEditors: hl
 * @LastEditTime: 2022-07-27 11:47:45
 */
import http from "@/api";
import { ResPage } from "../interface";

export const getUserList = (params: any) => {
	return http.post<ResPage<any>>(`/geeker/user/list`, params);
};
export const getMockData = (params?: any) => {
	return http.get<ResPage<any>>(`/mock/getLocalUserList`, params);
};
