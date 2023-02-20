/*
 * @Description:
 * @Autor: hl
 * @Date: 2022-07-12 09:37:42
 * @LastEditors: hl
 * @LastEditTime: 2022-07-20 18:08:13
 */
import { isArray, isNumber } from "@/utils/is";
/**
 * @description 使用递归处理路由菜单，生成一维数组
 * @param {Array} menuList 所有菜单列表
 * @param {Array} newArr 菜单的一维数组
 * @return array
 */
export function handleRouter(routerList: Menu.MenuOptions[], newArr: string[] = []) {
	routerList.forEach((item: Menu.MenuOptions) => {
		typeof item === "object" && item.path && newArr.push(item.path);
		item.children && item.children.length > 0 && handleRouter(item.children, newArr);
	});

	return newArr;
}
/**
 * @description 格式化表格单元格默认值
 * @param {String} cellValue 当前单元格值
 * @return string
 * */
export function defaultFormat(cellValue: any) {
	// 如果当前值为数组,使用 / 拼接（根据需求自定义）
	if (isArray(cellValue)) return cellValue.length ? cellValue.join(" / ") : "";
	return cellValue ?? "";
}

/**
 * @description 根据枚举列表查询当需要的数据
 * @param {String} cellValue 当前单元格值
 * @param {Array} enumData 枚举列表
 * @param {String} type 过滤类型（目前只有 tag）
 * @return string
 * */
export function filterEnum(cellValue: any, enumData: any[] = [], type?: string): string {
	let filterData = enumData.find(item => item.value === cellValue);
	if (type == "tag") return filterData?.tagType ? filterData.tagType : "";
	return filterData ? filterData.label : "";
}
/**
 * @description 根据枚举列表查询当需要的数据颜色
 * @param {String} cellValue 当前单元格值
 * @param {Array} enumData 枚举列表
 * @return string
 * */
export function filterEnumColor(cellValue: any, enumData: any[] = []): string {
	let fitlerData = enumData.find(item => item.value === cellValue);
	return fitlerData ? fitlerData.color : "";
}

/**
 * @description 金额格式化 （12345.6 => （12,345.6）
 * @param {any} cellValue 当前单元格值
 * @return string
 * */
export function formatMoney(cellValue: any) {
	if (isNumber(cellValue)) {
		// see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
		return (cellValue as Number).toLocaleString("zh", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
	} else {
		return cellValue;
	}
}

export function formatToDate(value: string) {
	const date = new Date(value),
		Y = date.getFullYear(),
		M = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1,
		D = date.getDate();

	return `${Y}-${M}-${D}`;
}

export function formatToBoolean(value: string) {
	return value ? "是" : "否";
}

export function appendHasChildren(src: any[]) {
	src.forEach(item => {
		item.hasChildren = item.is_leaf === 2;
		// item.children = [];
	});

	return src;
}

/**
 * 列表结构数据转换为树形结构数据
 * @param src 数据源
 * @param idField id字段名（默认id）
 * @param parentIdField 父id字段名（默认parent_id）
 * @param childrenField 保存子集数据的字段名（默认children）
 * @returns
 */
export function convertListToTree(
	src: any[],
	idField: string = "id",
	parentIdField: string = "parent_id",
	childrenField: string = "children"
) {
	if (src.length === 0) return src;
	let dist: any[] = [];
	let srcMap: any = new Map();
	src.forEach(item => (srcMap[item[idField]] = item));
	src.forEach(item => {
		let pNode = srcMap[item[parentIdField]];
		// 遍历原数据src，依据数据项的父id在map中查找，如果在map中能查到数据，则说明当前数据项属于子节点，否则为父节点
		if (pNode) {
			// 子节点
			if (!pNode[childrenField]) pNode[childrenField] = [];
			pNode[childrenField].push(item);
		} else {
			// 父节点
			dist.push(item);
		}
	});
	return dist;
}
/**
 * 对象属性转为number型
 * @param src 对象
 * @param fields 带转换属性列表
 */
export function convertObjecItemtoNumber(src: any, fields: Array<string>) {
	fields.forEach((item: any) => {
		if (src[item]) {
			src[item] = Number(src[item]);
		}
	});
}
