<!--
 * @Description: 
 * @Autor: hl
 * @Date: 2022-07-28 08:55:56
 * @LastEditors: hl
 * @LastEditTime: 2022-08-01 10:00:44
-->
<template>
	<el-tabs v-model="activeName" class="tabs-page" @tab-click="handleClick">
		<el-tab-pane label="导入" name="first">
			<BasicTable
				v-show="activeName === 'first'"
				ref="refBasicTable"
				:requestApi="getMockData"
				:initParam="initParam"
				:columns="columns"
			></BasicTable>
		</el-tab-pane>
		<el-tab-pane label="通过" name="second"> Config </el-tab-pane>
		<el-tab-pane label="支付失败" name="third">
			<BasicTable
				v-show="activeName === 'third'"
				ref="refBasicTable2"
				:requestApi="getMockData"
				:initParam="initParam"
				:columns="columns"
			></BasicTable>
		</el-tab-pane>
		<el-tab-pane label="历史记录" name="fourth">Task</el-tab-pane>
	</el-tabs>
</template>
<script setup lang="ts" name="BasicTabs">
import { ref, reactive, onMounted } from "vue";
import type { TabsPaneContext } from "element-plus";
import { ColumnProps } from "@/components/BasicTable/types/table";
import { genderTypeSelections } from "@/hooks/useSelection";
import BasicTable from "@/components/BasicTable/index.vue";

import { getMockData } from "@/api/modules/user";
const activeName = ref("first");

const handleClick = (tab: TabsPaneContext) => {
	refreshBasicTable(tab.paneName as string);
};
const refBasicTable = ref();
const refBasicTable2 = ref();
const initParam = reactive({ type: 1 });
// 配置项
const columns: Partial<ColumnProps>[] = [
	{
		type: "selection",
		width: 42,
		fixed: "left"
	},
	{
		type: "index",
		label: "序号",
		width: 56
	},
	{
		type: "expand",
		label: "明细",
		width: 56
	},
	{
		prop: "username",
		label: "姓名",
		search: true,
		align: "center",
		width: 420,
		isShowSum: true
	},
	{
		prop: "username",
		label: "姓名",
		search: true,
		align: "center",
		width: 420,
		isShowSum: true
	},
	{
		prop: "gender",
		label: "性别",
		width: 80,
		enum: genderTypeSelections,
		align: "center",
		search: true,
		sortable: true,
		searchType: "select"
	},
	{
		prop: "idCard",
		label: "身份证号",
		search: true,
		align: "center",
		width: 740
	},

	{
		prop: "age",
		label: "年龄",
		search: true,
		width: 100
	},
	{
		prop: "income",
		label: "薪水",
		search: true,
		sortable: true,
		isMoney: true,
		isShowSum: true,
		width: 120
	},
	{
		prop: "createTime",
		label: "创建时间",
		width: 200,
		sortable: true,
		search: false,
		searchType: "datetimerange",
		initSearchParam: ["2022-04-05 00:00:00", "2022-05-10 23:59:59"]
	}
];

const refreshBasicTable = (activeName: string) => {
	switch (activeName) {
		case "first":
			refBasicTable.value.refresh();
			break;
		case "third":
			refBasicTable2.value.refresh();
			break;
		default:
			break;
	}
};

onMounted(() => {
	refreshBasicTable(activeName.value);
});
</script>
<style scoped lang="scss"></style>
