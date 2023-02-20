/*
 * @Description:
 * @Autor: hl
 * @Date: 2022-07-27 09:21:02
 * @LastEditors: hl
 * @LastEditTime: 2022-07-29 14:44:59
 */

import { MockMethod } from "vite-plugin-mock";
import { MockTemplate } from "./dataTemplate";
import Mock from "mockjs";

export default [
	{
		url: "/mock/getLocalUserList",
		method: "get",
		response: () => {
			return {
				data: Mock.mock(MockTemplate.User())
			};
		}
	},
	{
		url: "/mock/getBasMofDivTree",
		method: "post",
		response: () => {
			return {
				data: testBasMofDivTreeData
			};
		}
	}
] as MockMethod[];

const testBasMofDivTreeData = [
	{
		mof_div_id: "1AD408F7-8BD2-41A7-91E5-9A3A0FF1587A",
		mof_div_code: "530000000",
		mof_div_name: "云南省",
		parent_id: "",
		level_no: "1",
		children: [
			{
				mof_div_id: "79425C47-6314-4769-977D-9322F0758E93",
				mof_div_code: "530100000",
				mof_div_name: "昆明市",
				parent_id: "1AD408F7-8BD2-41A7-91E5-9A3A0FF1587A",
				level_no: "2",
				children: [
					{
						mof_div_id: "B362146C-DDE9-4D27-99B3-D2B8AD648C06",
						mof_div_code: "530102000",
						mof_div_name: "五华区",
						parent_id: "79425C47-6314-4769-977D-9322F0758E93",
						level_no: "3",
						children: [
							{
								mof_div_id: "E40C3C20-0F77-6A48-E053-0621680A518F",
								mof_div_code: "530102001000",
								mof_div_name: "护国街道",
								parent_id: "B362146C-DDE9-4D27-99B3-D2B8AD648C06",
								level_no: "4",
								children: [
									{
										mof_div_id: "DEDC2CB4-4B51-8A50-E053-500D7C0A3FF7",
										mof_div_code: "53052400301200",
										mof_div_name: "柯街农场-长名称测试",
										parent_id: "E40C3C20-0F77-6A48-E053-0621680A518F",
										level_no: "5"
									}
								]
							},
							{
								mof_div_id: "E40C3C20-0F7C-6A48-E053-0621680A518F",
								mof_div_code: "530102006000",
								mof_div_name: "丰宁街道",
								parent_id: "B362146C-DDE9-4D27-99B3-D2B8AD648C06",
								level_no: "4"
							},
							{
								mof_div_id: "E40C3C20-0F78-6A48-E053-0621680A518F",
								mof_div_code: "530102002000",
								mof_div_name: "大观街道",
								parent_id: "B362146C-DDE9-4D27-99B3-D2B8AD648C06",
								level_no: "4"
							}
						]
					},
					{
						mof_div_id: "B362146C-DDE9-4D27-99B3-D2B8AD648C06",
						mof_div_code: "530102000",
						mof_div_name: "五华区2",
						parent_id: "79425C47-6314-4769-977D-9322F0758E93",
						level_no: "3"
					},
					{
						mof_div_id: "B362146C-DDE9-4D27-99B3-D2B8AD648C06",
						mof_div_code: "530102000",
						mof_div_name: "五华区3",
						parent_id: "79425C47-6314-4769-977D-9322F0758E93",
						level_no: "3"
					},
					{
						mof_div_id: "B362146C-DDE9-4D27-99B3-D2B8AD648C06",
						mof_div_code: "530102000",
						mof_div_name: "五华区4",
						parent_id: "79425C47-6314-4769-977D-9322F0758E93",
						level_no: "3"
					},
					{
						mof_div_id: "B362146C-DDE9-4D27-99B3-D2B8AD648C06",
						mof_div_code: "530102000",
						mof_div_name: "五华区5",
						parent_id: "79425C47-6314-4769-977D-9322F0758E93",
						level_no: "3"
					},
					{
						mof_div_id: "B362146C-DDE9-4D27-99B3-D2B8AD648C06",
						mof_div_code: "530102000",
						mof_div_name: "五华区6",
						parent_id: "79425C47-6314-4769-977D-9322F0758E93",
						level_no: "3"
					},
					{
						mof_div_id: "B362146C-DDE9-4D27-99B3-D2B8AD648C06",
						mof_div_code: "530102000",
						mof_div_name: "五华区7",
						parent_id: "79425C47-6314-4769-977D-9322F0758E93",
						level_no: "3"
					},
					{
						mof_div_id: "B362146C-DDE9-4D27-99B3-D2B8AD648C06",
						mof_div_code: "530102000",
						mof_div_name: "五华区8",
						parent_id: "79425C47-6314-4769-977D-9322F0758E93",
						level_no: "3"
					},
					{
						mof_div_id: "B362146C-DDE9-4D27-99B3-D2B8AD648C06",
						mof_div_code: "530102000",
						mof_div_name: "五华区9",
						parent_id: "79425C47-6314-4769-977D-9322F0758E93",
						level_no: "3"
					},
					{
						mof_div_id: "B362146C-DDE9-4D27-99B3-D2B8AD648C06",
						mof_div_code: "530102000",
						mof_div_name: "五华区10",
						parent_id: "79425C47-6314-4769-977D-9322F0758E93",
						level_no: "3"
					}
				]
			},
			{
				mof_div_id: "ADF2DD68-75EA-42ED-BD18-114BAA6DEC76",
				mof_div_code: "530300000",
				mof_div_name: "曲靖市",
				parent_id: "1AD408F7-8BD2-41A7-91E5-9A3A0FF1587A",
				level_no: "2",
				children: [
					{
						mof_div_id: "B362146C-DDE9-4D27-99B3-D2B8AD648C06",
						mof_div_code: "530102000",
						mof_div_name: "五华区",
						parent_id: "79425C47-6314-4769-977D-9322F0758E93",
						level_no: "3",
						children: [
							{
								mof_div_id: "E40C3C20-0F77-6A48-E053-0621680A518F",
								mof_div_code: "530102001000",
								mof_div_name: "护国街道",
								parent_id: "B362146C-DDE9-4D27-99B3-D2B8AD648C06",
								level_no: "4",
								children: [
									{
										mof_div_id: "DEDC2CB4-4B51-8A50-E053-500D7C0A3FF7",
										mof_div_code: "53052400301200",
										mof_div_name: "柯街农场",
										parent_id: "E40C3C20-0F77-6A48-E053-0621680A518F",
										level_no: "5"
									}
								]
							},
							{
								mof_div_id: "E40C3C20-0F7C-6A48-E053-0621680A518F",
								mof_div_code: "530102006000",
								mof_div_name: "丰宁街道",
								parent_id: "B362146C-DDE9-4D27-99B3-D2B8AD648C06",
								level_no: "4"
							},
							{
								mof_div_id: "E40C3C20-0F78-6A48-E053-0621680A518F",
								mof_div_code: "530102002000",
								mof_div_name: "大观街道",
								parent_id: "B362146C-DDE9-4D27-99B3-D2B8AD648C06",
								level_no: "4"
							}
						]
					},
					{
						mof_div_id: "B362146C-DDE9-4D27-99B3-D2B8AD648C06",
						mof_div_code: "530102000",
						mof_div_name: "五华区",
						parent_id: "79425C47-6314-4769-977D-9322F0758E93",
						level_no: "3"
					},
					{
						mof_div_id: "B362146C-DDE9-4D27-99B3-D2B8AD648C06",
						mof_div_code: "530102000",
						mof_div_name: "五华区",
						parent_id: "79425C47-6314-4769-977D-9322F0758E93",
						level_no: "3"
					},
					{
						mof_div_id: "B362146C-DDE9-4D27-99B3-D2B8AD648C06",
						mof_div_code: "530102000",
						mof_div_name: "五华区",
						parent_id: "79425C47-6314-4769-977D-9322F0758E93",
						level_no: "3"
					},
					{
						mof_div_id: "B362146C-DDE9-4D27-99B3-D2B8AD648C06",
						mof_div_code: "530102000",
						mof_div_name: "五华区",
						parent_id: "79425C47-6314-4769-977D-9322F0758E93",
						level_no: "3"
					},
					{
						mof_div_id: "B362146C-DDE9-4D27-99B3-D2B8AD648C06",
						mof_div_code: "530102000",
						mof_div_name: "五华区",
						parent_id: "79425C47-6314-4769-977D-9322F0758E93",
						level_no: "3"
					},
					{
						mof_div_id: "B362146C-DDE9-4D27-99B3-D2B8AD648C06",
						mof_div_code: "530102000",
						mof_div_name: "五华区",
						parent_id: "79425C47-6314-4769-977D-9322F0758E93",
						level_no: "3"
					},
					{
						mof_div_id: "B362146C-DDE9-4D27-99B3-D2B8AD648C06",
						mof_div_code: "530102000",
						mof_div_name: "五华区",
						parent_id: "79425C47-6314-4769-977D-9322F0758E93",
						level_no: "3"
					},
					{
						mof_div_id: "B362146C-DDE9-4D27-99B3-D2B8AD648C06",
						mof_div_code: "530102000",
						mof_div_name: "五华区",
						parent_id: "79425C47-6314-4769-977D-9322F0758E93",
						level_no: "3"
					},
					{
						mof_div_id: "B362146C-DDE9-4D27-99B3-D2B8AD648C06",
						mof_div_code: "530102000",
						mof_div_name: "五华区",
						parent_id: "79425C47-6314-4769-977D-9322F0758E93",
						level_no: "3"
					}
				]
			},
			{
				mof_div_id: "00EB7B1C-54A5-40FC-ABF1-D79C2FE96F3B",
				mof_div_code: "530400000",
				mof_div_name: "玉溪市",
				parent_id: "1AD408F7-8BD2-41A7-91E5-9A3A0FF1587A",
				level_no: "2"
			},
			{
				mof_div_id: "833F8404-6C5E-4949-A9D6-CB821589C090",
				mof_div_code: "530500000",
				mof_div_name: "保山市",
				parent_id: "1AD408F7-8BD2-41A7-91E5-9A3A0FF1587A",
				level_no: "2"
			}
		]
	}
];
