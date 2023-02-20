<!--
 * @Description: 
 * @Autor: hl
 * @Date: 2022-07-12 14:39:38
 * @LastEditors: hl
 * @LastEditTime: 2022-08-01 14:06:53
-->
<template>
	<BasicTable ref="refBasicTable" :requestApi="getMockData" :initParam="initParam" :columns="columns">
		<template #tableHeader="scope">
			<!-- 表格 header 按钮 -->
			<el-button type="danger" :icon="Delete" plain :disabled="!scope.isSelected" @click="batchDelete(scope.ids)">
				批量删除用户
			</el-button>
		</template>
		<!-- Expand  表格展开-->
		<template #expand="scope">
			{{ scope.row }}
		</template>
		<!-- 行内编辑示例 -->
		<template #status="scope">
			<!-- 如果插槽的值为 el-switch，第一次加载会默认触发 switch 的 @change 方法，所有在外层包一个盒子，点击触发盒子 click 方法 -->
			<div @click="changeStatus(scope.row)">
				<el-switch
					:value="scope.row.status"
					:active-text="scope.row.status === 1 ? '启用' : '禁用'"
					:active-value="1"
					:inactive-value="0"
				/>
			</div>
		</template>
		<!-- 行内按钮 示例 -->
		<template #operation="scope">
			<el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
			<el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
			<el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
		</template>
	</BasicTable>
</template>
<script setup lang="ts" name="tableUseComponent">
import { ref, reactive, onMounted } from "vue";
import { View, Delete, EditPen } from "@element-plus/icons-vue";
import { ColumnProps } from "@/components/BasicTable/types/table";
import { genderTypeSelections } from "@/hooks/useSelection";
import BasicTable from "@/components/BasicTable/index.vue";

// getUserList,getMockData
import { getMockData } from "@/api/modules/user";
const refBasicTable = ref();
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
		width: 120,
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
		width: 240
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
		prop: "avatar",
		label: "头像",
		width: 200,
		image: true
	},

	{
		prop: "createTime",
		label: "创建时间",
		width: 200,
		sortable: true,
		search: false,
		searchType: "datetimerange",
		initSearchParam: ["2022-04-05 00:00:00", "2022-05-10 23:59:59"]
	},
	{
		prop: "status",
		label: "用户状态",
		sortable: false,
		width: 200
	},
	{
		prop: "operation",
		label: "操作",
		align: "center",
		fixed: "right"
	}
];

// 批量删除
const batchDelete = (ids: string[]) => {
	console.log(ids);
	refBasicTable.value.refresh();
};

onMounted(() => {
	refBasicTable.value.refresh();
});

const openDrawer = (title: string, row: any) => {
	console.log(title, row.username);
};

const deleteAccount = (row: any) => {
	console.log(row.username);
};

const changeStatus = (row: any) => {
	row.status = row.status == 1 ? 0 : 1;
};
</script>
<style lang="scss"></style>
