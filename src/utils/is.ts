/*
 * @Description:
 * @Autor: hl
 * @Date: 2022-07-12 15:50:42
 * @LastEditors: hl
 * @LastEditTime: 2022-07-14 17:02:21
 */

/**
 * @description: 判断值是否未某个类型
 */
export function is(val: unknown, type: string) {
	return toString.call(val) === `[object ${type}]`;
}

/**
 * @description:  是否为数组
 */
export function isArray(val: any): val is Array<any> {
	return val && Array.isArray(val);
}
/**
 * @description:  是否为函数
 */
export function isFunction<T = Function>(val: unknown): val is T {
	return is(val, "Function");
}

export function isNumber(val: unknown): val is number {
	return is(val, "Number");
}
