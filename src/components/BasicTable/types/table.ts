/*
 * @Description:
 * @Autor: hl
 * @Date: 2022-07-06 17:19:33
 * @LastEditors: hl
 * @LastEditTime: 2022-08-01 11:44:28
 */
import { OptionTypeEnum } from "@/enums/commonEnum";

export namespace Table {
	export interface Pageable {
		current_page: number;
		page_size: number;
		total: number;
	}
	export interface LasyNodeModifyProps {
		type: OptionTypeEnum;
		node: {
			[key: string]: any;
		};
	}
	export interface TableStateProps {
		tableData: any[];
		expandRowKeys: any[];
		searchShow: boolean;
		pageable: Pageable;
		searchParam: {
			[key: string]: any;
		};
		initSearchParam: {
			[key: string]: any;
		};
		totalParam: {
			[key: string]: any;
		};
		icon?: {
			[key: string]: any;
		};
	}
}

export namespace HandleData {
	export type MessageType = "" | "success" | "warning" | "info" | "error";
}

export interface EnumProps {
	label: string; // 选项框显示的文字
	value: any; // 选项框的值
	disabled?: boolean; // 是否禁用次选项
	tagType?: string; // 当 tag 为 true 时，此选择会指定 tag 显示类型
	children?: EnumProps[]; // 为树形选择时，可以通过 children 属性指定子选项
}

export interface EnumPropsConfig {
	enumValueField: string; // 枚举类型显示value的字段名
	enumNameField: string; // 枚举类型显示name的字段名
}

export type SearchType =
	| "text"
	| "select"
	| "multipleSelect"
	| "treeSelect"
	| "multipleTreeSelect"
	| "date"
	| "daterange"
	| "timerange"
	| "datetimerange"
	| "searchTool";

export type TypeProp = "index" | "selection" | "expand";

export type FixedProp = "left" | "right";

export type TableCellAlign = "left" | "center" | "right";

/**
 * 列表/查询条件 配置。
 */
export interface ColumnProps {
	/**
	 * index | selection | expand（特殊类型）
	 */
	type: TypeProp;
	/**
	 * 单元格数据（非特殊类型必填）
	 */
	prop: string;
	/**
	 * 单元格标题（非特殊类型必填）
	 */
	label: string;
	/**
	 * 列宽
	 */
	width: number | string;
	/**
	 * 是否显示
	 */
	isShow: boolean;
	/**
	 * 固定列
	 */
	fixed: FixedProp;
	/**
	 * 是否可排序
	 */
	sortable: boolean;
	/**
	 * 是否是标签展示
	 */
	tag: boolean;
	/**
	 * 是否是图片展示
	 */
	image: boolean;
	/**
	 * 是否为搜索项
	 */
	search: boolean;
	/**
	 * 搜索项类型
	 */
	searchType: SearchType;
	/**
	 * 搜索项初始值
	 */
	initSearchParam: string | number | boolean | any[];
	/**
	 * 查询条件配置。数据变更时，是否刷新表格数据（默认不刷新，一般用于select、date 类型的查询）。
	 */
	isQueryOnChange: boolean;
	/**
	 * 枚举类型（渲染值的字典）
	 */
	enum: EnumProps[];
	/**
	 * 获取枚举类型数据的接口
	 */
	enumApi: (params: any) => Promise<any>;
	/**
	 * 自定义表头
	 */
	readerHeader: (param: any) => any;
	/**
	 *  显示位置。如果不配置，默认居中
	 */
	align: TableCellAlign;
	/**
	 * 是否是金额展示
	 */
	isMoney: boolean;
	/**
	 *  时间戳格式（列表显示为YYYY-MM-DD格式）
	 */
	isTimestamp: boolean;
	/**
	 * 是否是Boolean（列表显示为 是/否）
	 */
	isBoolean: boolean;
	/**
	 * 是否计算合计
	 */
	isShowSum: boolean;
}
