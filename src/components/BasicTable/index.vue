<template>
	<div class="table-box">
		<!-- 查询表单 -->
		<SearchForm
			:search="searchData"
			:reset="reset"
			:searchParam="searchParam"
			:columns="searchColumns"
			v-show="isShowSearch"
		></SearchForm>
		<!-- 表格头部 操作按钮 -->
		<div class="table-header">
			<div class="header-button-lf">
				<slot name="tableHeader" :ids="selectedListIds" :isSelected="isSelected" :totalParam="getTotalParam()"></slot>
			</div>
			<div class="header-button-ri" v-if="toolButton">
				<el-button :icon="Refresh" circle @click="getTableList"> </el-button>
				<el-button :icon="Operation" circle @click="openColSetting"> </el-button>
				<el-button :icon="Search" circle v-if="searchColumns.length" @click="isShowSearch = !isShowSearch"> </el-button>
			</div>
		</div>
		<!-- 表格主体 -->
		<el-table
			ref="tableRef"
			height="575"
			:data="tableData"
			:border="border"
			@selection-change="selectionChange"
			:row-key="rowKey"
			:expand-row-keys="expandRowKeys"
			:stripe="stripe"
			:lazy="isTreeTable"
			:load="loadTreeLeafs"
			:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
			:show-summary="isShowSummaries()"
			:summary-method="getSummaries"
		>
			<template v-for="item in tableColumns" :key="item">
				<!-- selection || index -->
				<el-table-column
					v-if="item.type == 'selection' || item.type == 'index'"
					:type="item.type"
					:reserve-selection="item.type == 'selection'"
					:label="item.label"
					:width="item.width"
					:fixed="item.fixed"
					align="center"
				>
				</el-table-column>
				<!-- expand（展开查看详情，请使用作用域插槽,如果数据中没有id字段，这里展开会展开所有行） -->
				<el-table-column
					v-if="item.type == 'expand'"
					:type="item.type"
					:label="item.label"
					:width="item.width"
					:fixed="item.fixed"
					align="center"
					v-slot="scope"
				>
					<slot :name="item.type" :row="scope.row"></slot>
				</el-table-column>
				<!-- other -->
				<el-table-column
					v-if="!item.type && item.prop && item.isShow"
					header-align="center"
					:align="item.isMoney ? 'right' : item.align ? item.align : 'center'"
					:prop="item.prop"
					:label="item.label"
					:width="item.width"
					:sortable="item.sortable"
					:show-overflow-tooltip="item.prop !== 'operation'"
					:resizable="true"
					:fixed="item.fixed"
				>
					<!-- 自定义 header (使用组件渲染 tsx 语法) -->
					<!-- <template #header v-if="item.renderHeader">
						<component :is="item.renderHeader" :row="item"> </component>
					</template> -->

					<!-- 自定义配置每一列 slot（使用作用域插槽） -->
					<template #default="scope">
						<slot :name="item.prop" :row="scope.row">
							<!-- 图片(自带预览) -->
							<el-image
								v-if="item.image"
								:src="scope.row[item.prop!]"
								:preview-src-list="[scope.row[item.prop!]]"
								fit="cover"
								class="table-image"
								preview-teleported
							/>
							<!-- tag 标签（自带格式化内容） -->
							<el-tag v-else-if="item.tag" :type="filterEnum(scope.row[item.prop!],item.enum,'tag')">
								{{
									item.enum?.length ? filterEnum(scope.row[item.prop!], item.enum) : defaultFormat(scope.row[item.prop!])
								}}
							</el-tag>
							<!-- 金额，格式化 -->
							<span v-else-if="item.isMoney">
								{{
									formatMoney(scope.row[item.prop!])
								}}
							</span>
							<!-- 时间戳，格式化 -->
							<span v-else-if="item.isTimestamp">
								{{
									formatToDate(scope.row[item.prop!])
								}}
							</span>
							<!-- Boolean，格式化 -->
							<span v-else-if="item.isBoolean">
								{{
									formatToBoolean(scope.row[item.prop!])
								}}
							</span>
							<!-- 文字（自带格式化内容） -->
							<span v-else :style="`color:${filterEnumColor(scope.row[item.prop!], item.enum)}`">
								{{
									item.enum?.length ? filterEnum(scope.row[item.prop!], item.enum) : defaultFormat(scope.row[item.prop!])
								}}
							</span>
						</slot>
					</template>
				</el-table-column>
			</template>
			<template #empty>
				<div class="table-empty">
					<img src="@/assets/images/notData.png" alt="notData" />
					<div>暂无数据</div>
				</div>
			</template>
		</el-table>
		<!-- 分页 -->
		<Pagination
			v-if="pagination"
			:pageable="pageable"
			:handleSizeChange="handleSizeChange"
			:handleCurrentChange="handleCurrentChange"
		></Pagination>
		<!-- 列设置 -->
		<ColSetting v-if="toolButton" ref="colRef" :tableRef="tableRef" :colSetting="colSetting"></ColSetting>
	</div>
</template>

<script setup lang="ts" name="BasicTable">
import { ref, reactive } from "vue";
import { useTable } from "./hooks/useTable";
import { Table } from "./types/table";
import { useSelection } from "./hooks/useSelection";
import { useSearchForm } from "../SearchForm/hooks/userSearchForm";
import { Refresh, Operation, Search } from "@element-plus/icons-vue";
import { ColumnProps } from "@/components/BasicTable/types/table";
import { filterEnum, filterEnumColor, defaultFormat, formatMoney, formatToDate, formatToBoolean } from "@/utils/util";
import SearchForm from "@/components/SearchForm/index.vue";
import Pagination from "@/components/Pagination/index.vue";
import ColSetting from "./components/ColSetting.vue";

// 表格 DOM 元素
const tableRef = ref();
// 是否显示搜索模块
const isShowSearch = ref<boolean>(true);

interface BasicTableProps {
	columns: Partial<ColumnProps>[]; // 列配置项
	requestApi: (params: any) => Promise<any>; // 请求表格数据的api ==> 必传
	pagination?: boolean; // 是否需要分页组件 ==> 非必传（默认为true）
	initParam?: any; // 初始化请求参数 ==> 非必传（默认为{}）
	border?: boolean; // 表格是否显示边框 ==> 非必传（默认为true）
	stripe?: boolean; // 是否带斑马纹表格 ==> 非必传（默认为false）
	toolButton?: boolean; // 是否显示表格功能按钮 ==> 非必传（默认为true）
	hasChildren?: boolean;
	rowKey?: string;
	isTreeTable?: boolean; // 是否树形结构，默认否，
	hideSelectionColumn?: boolean; // 是否隐藏选择列
	hideIndexColumn?: boolean; // 是否隐藏序号列
	initSearchColumns?: Partial<ColumnProps>[]; // 默认查询条件
	requiredQueryParams: string; //必要查询条件。如果必须有值的参数没有赋值，则不查询数据
}

// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<BasicTableProps>(), {
	columns: () => [],
	pagination: true,
	initParam: {},
	border: true,
	stripe: false,
	toolButton: true,
	isTreeTable: false,
	hideSelectionColumn: false,
	hideIndexColumn: false,
	rowKey: "id",
	requiredQueryParams: "",
	initSearchColumns: () => []
});

// 表格多选 Hooks
const { selectionChange, selectedListIds, isSelected } = useSelection(props.rowKey);

// 表格操作 Hooks
const {
	tableData,
	pageable,
	searchParam,
	initSearchParam,
	getTableList,
	search,
	reset,
	handleSizeChange,
	handleCurrentChange,
	isShowSummaries,
	getSummaries,
	expandRowKeys,
	getTotalParam,
	loadTreeLeafs,
	updateLazyNodes
} = useTable(
	props.requestApi,
	props.initParam,
	props.pagination,
	props.columns,
	props.rowKey,
	props.isTreeTable,
	props.requiredQueryParams
);

const searchData = () => {
	clearSelection();
	search();
};

/**
 * 异步树节点修改
 * @param info 节点
 */
const modifyLazyNode = (info: Table.LasyNodeModifyProps) => {
	if (!props.isTreeTable) return;
	updateLazyNodes(info.type, info.node, tableRef.value.store.states.lazyTreeNodeMap.value, props.rowKey);
};

/**
 * 节点刷新
 */
const refreshNode = (row: any) => {
	const treeStore = tableRef.value.store;
	treeStore.loadOrToggle(row);
};

// 清空选中数据列表
const clearSelection = () => tableRef.value!.clearSelection();

// 查询条件操作 Hooks
const { setSearchTool } = useSearchForm();

// 表格列配置项处理（添加 isShow 属性，控制显示/隐藏）
const tableColumns = ref<Partial<ColumnProps>[]>();
tableColumns.value = props.columns.map(item => {
	return {
		...item,
		isShow: true
	};
});

// 过滤需要搜索的配置项
let searchColumns = reactive<Partial<ColumnProps>[]>([]);
let searchList = props.initSearchColumns.concat(props.columns.filter(item => item.search));
searchColumns = setSearchTool(searchList);
// 设置搜索表单的默认值
searchColumns.forEach((column: Partial<ColumnProps>) => {
	if (column.initSearchParam !== undefined && column.initSearchParam !== null) {
		initSearchParam.value[column.prop!] = column.initSearchParam;
	}
});
// * 列设置
const colRef = ref();
// 过滤掉不需要设置显隐的列
const colSetting = tableColumns.value.filter((item: Partial<ColumnProps>) => {
	return item.type !== "selection" && item.type !== "index" && item.type !== "expand" && item.prop !== "operation";
});
const openColSetting = () => {
	colRef.value.openColSetting();
};

// 展开行
// 暴露给父组件的参数和方法
defineExpose({ searchParam, refresh: searchData, modifyLazyNode: modifyLazyNode, tableData, refreshNode });
</script>
