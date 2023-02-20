/*
 * @Description:
 * @Autor: hl
 * @Date: 2022-07-18 11:13:56
 * @LastEditors: hl
 * @LastEditTime: 2022-07-19 15:48:13
 */
import http from "@/api";
import { ResPage } from "../interface";
// const headers = {
// 	Cookie: "token=; userinfo=; ctjTokenId=MDFhNmNkYmUtZTlmMi00MTdlLWE0YjktZjUxNjNmNmMzODU3",
// 	userInfo: ""
// };
// const baseURL = "http://192.168.1.118:18002";
export const getTest = (params: any) => {
	const config = {
		baseURL: "/yn-realpay-server"
	};
	return http.get<ResPage<any>>(
		`/elements/loadAgencyTree?ele_sort=Agency&menuid=d3748e2614d54dfbabd6fc66fe88c7d5`,
		params,
		config
	);
};

export async function testProxy(params: any) {
	return http.get<ResPage<any>>(`/users/messi`, params);
}
