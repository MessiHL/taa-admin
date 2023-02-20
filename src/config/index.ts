/*
 * @Description:
 * @Autor: hl
 * @Date: 2022-07-12 10:07:20
 * @LastEditors: hl
 * @LastEditTime: 2022-07-14 15:34:29
 */

/**
 * 首页地址（/home/index）
 */
export const HOME_URL: string = "/home/index";

/**
 * 登录页地址 /login"
 */
export const LOGIN_URL: string = "/login";

// * Tabs（黑名单地址，不需要添加到 tabs 的路由地址）
export const TABS_BLACK_LIST: string[] = ["/403", "/404", "/500", "/layout", "/login", "/dataScreen"];
// * 高德地图key
export const MAP_KEY: string = "";

// * 每行查询条件数量
export const EACH_LINE_SEARCH_ITEM_COUNT: number = 4;

// * 分页显示
export const PAGINATION_LAYOUT: string = "sizes,total,jumper, prev, pager, next";
