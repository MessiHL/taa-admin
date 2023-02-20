/*
 * @Description:
 * @Autor: hl
 * @Date: 2022-07-06 17:18:06
 * @LastEditors: hl
 * @LastEditTime: 2022-07-29 14:34:14
 */

import { reactive, toRefs, onMounted, computed } from "vue";
import { formatMoney, appendHasChildren } from "@/utils/util";
import { Table, ColumnProps } from "./../types/table";
import { OptionTypeEnum } from "@/enums/commonEnum";

export const useTable = (
	api: (params: any) => Promise<any>,
	initParam: object = {},
	isPageable: boolean = true,
	columnProps: Partial<ColumnProps>[] = [],
	rowKey: string = "id",
	isTreeTable: boolean = false,
	requiredQueryParams: string = "",
	hideSelectionColumn: boolean = false,
	hideIndexColumn: boolean = false
) => {
	// 添加默认列(默认列会影响合计列的显示，故已开始就先添加)
	appendInitColumns(columnProps, hideSelectionColumn, hideIndexColumn);

	const state = reactive<Table.TableStateProps>({
		// 表格数据
		tableData: [],
		// 是否展开更多搜索框
		searchShow: false,
		// 分页
		pageable: {
			current_page: 1,
			page_size: 50,
			total: 0
		},
		// 查询参数
		searchParam: {},
		// 初始化查询参数
		initSearchParam: {},
		// 总参数
		totalParam: {},
		// 展开行
		expandRowKeys: []
	});

	// 初始化的时候需要做的事情就是 设置表单查询默认值 && 获取表格数据(reset函数的作用刚好是这两个功能)
	onMounted(() => {
		reset();
	});
	const pageParam = computed({
		get: () => {
			return {
				current_page: state.pageable.current_page,
				page_size: state.pageable.page_size
			};
		},
		set: (newVal: any) => {
			console.log(newVal);
		}
	});

	//  获取表格数据
	const getTableList = async () => {
		try {
			//  先更新查询参数
			updateTotalParam();
			if (requiredQueryParams && !state.totalParam[requiredQueryParams]) {
				return;
			}

			const ret = await api(state.totalParam);
			if (ret) {
				const { data } = ret;

				if (isTreeTable) {
					// 树形结构
					state.tableData = appendHasChildren(data);

					// 展开行
					state.expandRowKeys = [];
					const filters = state.tableData.filter(item => item.parent_id === null);
					filters.forEach(element => state.expandRowKeys.push(element[rowKey]));
				} else {
					state.tableData = isPageable ? data.data : data;
				}

				// 分页
				if (isPageable) {
					const { current_page, page_size, total } = data;
					updatePageable({ current_page, page_size, total });
				}
			}
		} catch (error) {
			console.log(error);
		}
	};
	// 更新查询参数
	const updateTotalParam = () => {
		state.totalParam = {};
		// 处理查询参数，可以给查询参数加自定义前缀操作
		let nowSearchParam: { [propName: string]: any } = {};
		// 防止手动清空输入框携带参数（可以自定义查询参数前缀）
		for (let key in state.searchParam) {
			// * 某些情况下参数为 false/0 也应该携带参数
			if (state.searchParam[key] || state.searchParam[key] === false || state.searchParam[key] === 0) {
				nowSearchParam[key] = state.searchParam[key];
			}
		}

		state.totalParam = Object.assign({}, state.totalParam, nowSearchParam, isPageable ? pageParam.value : {}, initParam);
	};

	// 更新分页信息
	const updatePageable = (resPageable: Table.Pageable) => {
		Object.assign(state.pageable, resPageable);
	};

	/**
	 * @description 表格数据查询
	 * @return void
	 * */
	const search = () => {
		state.pageable.current_page = 1;
		getTableList();
	};

	/**
	 * @description 表格数据重置
	 * @return void
	 * */
	const reset = () => {
		state.pageable.current_page = 1;
		state.searchParam = {};
		// 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
		Object.keys(state.initSearchParam).forEach(key => {
			state.searchParam[key] = state.initSearchParam[key];
		});
		getTableList();
	};

	//  每页条数改变
	const handleSizeChange = (val: number) => {
		state.pageable.page_size = val;
		state.pageable.current_page = 1;
		getTableList();
	};

	// 页面改变
	const handleCurrentChange = (val: number) => {
		state.pageable.current_page = val;
		getTableList();
	};

	//  是否需要显示合计
	const isShowSummaries = () => {
		const filterColumns = columnProps.filter(x => x.isShowSum);
		return filterColumns.length > 0;
	};

	// 计算合计列
	const getSummaries = () => {
		const sums: string[] = [];
		columnProps.forEach((column, index) => {
			if (index === 1) {
				sums[index] = "合计";
				return false;
			}
			if (column.isShowSum && column.prop) {
				const values = state.tableData.map(item => Number(item[column.prop || ""]));
				if (!values.every(value => Number.isNaN(value))) {
					sums[index] = `${values
						.reduce((prev, curr) => {
							const value = Number(curr);
							if (!Number.isNaN(value)) {
								return prev + curr;
							} else {
								return prev;
							}
						}, 0)
						.toFixed(2)}`;

					sums[index] = formatMoney(sums[index]);
				}
			} else {
				sums[index] = "";
			}
		});

		return sums;
	};

	const getTotalParam = () => {
		return state.totalParam;
	};

	/**
	 * 添加默认列
	 * @param tableColumns 表格列集合
	 * @param hideSelectionColumn 是否隐藏选择列
	 * @param hideIndexColumn 是否隐藏序号列
	 */
	function appendInitColumns(
		tableColumns: Partial<ColumnProps>[],
		hideSelectionColumn: boolean = false,
		hideIndexColumn: boolean = false
	) {
		const hasNoIndex = tableColumns.filter(x => x.type === "index").length === 0;
		const hasNoSelection = tableColumns.filter(x => x.type === "selection").length === 0;

		if (hasNoIndex && !hideIndexColumn) {
			tableColumns.unshift({
				type: "index",
				label: "序号",
				width: 56,
				isShow: true
			});
		}
		if (hasNoSelection && !hideSelectionColumn) {
			tableColumns.unshift({
				type: "selection",
				width: 40,
				fixed: "left",
				isShow: true
			});
		}
	}

	/**
	 * 懒加载子节点
	 * @param row 父级
	 * @param treeNode 节点
	 * @param resolve 回调
	 */
	const loadTreeLeafs = (row: any, treeNode: any, resolve: any) => {
		const param = { parent_id: row[rowKey] };
		api(param).then(res => {
			resolve(appendHasChildren(res.data));
		});
	};

	/**
	 * 节点更新
	 * @param optionType 操作类型  OptionTypeEnum
	 * @param newNodeData  已更新的节点
	 * @param lazyTreeNodeMap 变动过节点的原始数据集合
	 * @param rowKey 主键字段名称 (默认 id)
	 * @param parentIdKey  父ID字段名称 (默认 parent_id)
	 */
	const updateLazyNodes = (
		optionType: OptionTypeEnum,
		newNodeData: any,
		lazyTreeNodeMap: any,
		rowKey: string = "id",
		parentIdKey: string = "parent_id"
	) => {
		const parentId = newNodeData[parentIdKey];
		if (parentId) {
			const index = lazyTreeNodeMap[parentId].findIndex((item: any) => item[rowKey] === newNodeData[rowKey]);
			if (optionType === OptionTypeEnum.EDIT) {
				// 编辑
				lazyTreeNodeMap[parentId][index] = newNodeData;
			} else if (optionType === OptionTypeEnum.ADD_CHILD && lazyTreeNodeMap[parentId]) {
				// 添加子集
				lazyTreeNodeMap[parentId].push(newNodeData);
			} else if (optionType === OptionTypeEnum.DELETE && lazyTreeNodeMap[parentId]) {
				// 删除
				lazyTreeNodeMap[parentId].splice(index, 1);
			} else {
			}
		}
	};

	return {
		...toRefs(state),
		getTableList,
		search,
		reset,
		handleSizeChange,
		handleCurrentChange,
		isShowSummaries,
		getSummaries,
		appendInitColumns,
		getTotalParam,
		loadTreeLeafs,
		updateLazyNodes
	};
};
