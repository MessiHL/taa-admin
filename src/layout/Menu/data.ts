/*
 * @Description:
 * @Autor: hl
 * @Date: 2022-07-15 10:34:13
 * @LastEditors: hl
 * @LastEditTime: 2022-07-28 09:02:57
 */
export const getMenuList = () => {
	return [
		{
			icon: "home-filled",
			title: "首页",
			path: "/home/index"
		},
		{
			icon: "list",
			title: "报价管理",
			path: "/bussiness",
			children: [
				{
					path: "/taa/quote/priceSheet",
					title: "报价",
					icon: ""
				}
			]
		},
		{
			icon: "list",
			title: "常用组件",
			path: "/base",
			children: [
				{
					path: "/base/table/useComponent",
					title: "表格",
					icon: "menu"
				},
				{
					path: "/base/tree/index",
					title: "树",
					icon: "menu"
				},
				{
					path: "/base/layout/index",
					title: "布局",
					icon: "menu"
				},
				{
					path: "/base/tabs/index",
					title: "tabs",
					icon: "menu"
				}
			]
		},
		{
			icon: "list",
			title: "菜单嵌套",
			path: "/menu",
			children: [
				{
					path: "/menu/menu1",
					title: "菜单1",
					icon: "menu"
				},
				{
					path: "/menu/menu2",
					title: "菜单2",
					icon: "menu",
					children: [
						{
							path: "/menu/menu2/menu21",
							title: "菜单2-1",
							icon: "menu"
						},
						{
							path: "/menu/menu2/menu22",
							title: "菜单2-2",
							icon: "menu",
							children: [
								{
									path: "/menu/menu2/menu22/menu221",
									title: "菜单2-2-1",
									icon: "menu"
								},
								{
									path: "/menu/menu2/menu22/menu222",
									title: "菜单2-2-2",
									icon: "menu"
								}
							]
						},
						{
							path: "/menu/menu2/menu23",
							title: "菜单2-3",
							icon: "menu"
						}
					]
				},
				{
					path: "/menu/menu3",
					title: "菜单3",
					icon: "menu"
				}
			]
		},
		{
			icon: "warning-filled",
			title: "错误页面",
			path: "/error",
			children: [
				{
					path: "/404",
					title: "404页面",
					icon: "menu"
				},
				{
					path: "/403",
					title: "403页面",
					icon: "menu"
				},
				{
					path: "/500",
					title: "500页面",
					icon: "menu"
				}
			]
		}
	];
};
