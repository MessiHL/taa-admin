/*
 * @Description: mock数据模版
 * @Autor: hl
 * @Date: 2022-07-27 10:58:49
 * @LastEditors: hl
 * @LastEditTime: 2022-07-29 14:46:22
 */

export namespace MockTemplate {
	// 数据模板：用户信息
	export const User = () => {
		return {
			"data|20": [
				{
					"index|+1": 0,
					id: "@id",
					idCard: "@id",
					username: "@cname",
					gender: "@integer(1,2)",
					age: "@integer(1,100)",
					weight: "@float(30,120,0,2) KG",
					income: "@float(3000,20000,0,2)",
					status: "@integer(0,1)",
					createTime: '@datetime("yyyy-MM-dd   HH:mm:ss")',
					avatar: "@image('800x600', '@hex', '@guid')"
				}
			],
			current_page: 1,
			page_size: 50,
			total: 300
		};
	};

	export const BasMofDiv = () => {
		return {
			"data|20": [
				{
					"index|+1": 0,
					id: "@id",
					createTime: '@datetime("yyyy-MM-dd   HH:mm:ss")'
				}
			],
			status_code: 200,
			current_page: 1,
			page_size: 1000,
			total: 300
		};
	};
}
