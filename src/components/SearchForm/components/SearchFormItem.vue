<!--
 * @Description: 
 * @Autor: hl
 * @Date: 2022-07-12 15:38:17
 * @LastEditors: hl
 * @LastEditTime: 2022-07-18 09:20:10
-->
<template>
	<!-- 文本框 -->
	<template v-if="currentItem.searchType == undefined || currentItem.searchType == 'text'">
		<el-input v-model="searchParam[currentItem.prop!]" placeholder="请输入" :clearable="clearable(currentItem)"></el-input>
	</template>
	<!-- 下拉选择框 -->
	<template v-if="currentItem.searchType == 'select' || currentItem.searchType == 'multipleSelect'">
		<el-select
			v-model="searchParam[currentItem.prop!]"
			:multiple="currentItem.searchType == 'multipleSelect'"
			:clearable="clearable(item)"
			@change="changeItem(item)"
		>
			<el-option
				v-for="(itemValue, $index) in currentItem.enum"
				:style="`color:${filterEnumColor(itemValue.value, currentItem.enum)}`"
				:key="itemValue.value ? itemValue.value : $index"
				:label="itemValue.label"
				:value="itemValue.value"
				:disabled="itemValue.disabled"
			/>
		</el-select>
	</template>
	<!-- 下拉树形选择框 -->
	<template v-if="currentItem.searchType == 'treeSelect' || currentItem.searchType == 'multipleTreeSelect'">
		<el-tree-select
			v-model="searchParam[currentItem.prop!]"
			:multiple="currentItem.searchType == 'multipleTreeSelect'"
			:data="currentItem.enum"
			@change="changeItem(item)"
		/>
	</template>
	<!-- 日期选择 -->
	<template v-if="currentItem.searchType == 'date'">
		<el-date-picker
			v-model="searchParam[currentItem.prop!]"
			value-format="YYYY-MM-DD"
			type="date"
			placeholder="请选择日期"
			:clearable="clearable(item)"
		/>
	</template>
	<!-- 时间范围选择 -->
	<template v-if="currentItem.searchType == 'timerange'">
		<el-time-picker
			v-model="searchParam[currentItem.prop!]"
			is-range
			value-format="HH:mm:ss"
			range-separator="至"
			start-placeholder="开始时间"
			end-placeholder="结束时间"
			:clearable="clearable(item)"
		/>
	</template>
	<!-- 日期范围选择 -->
	<template v-if="currentItem.searchType == 'daterange'">
		<el-date-picker
			v-model="searchParam[currentItem.prop!]"
			type="daterange"
			value-format="YYYY-MM-DD"
			range-separator="至"
			start-placeholder="开始时间"
			end-placeholder="结束时间"
			:clearable="clearable(item)"
		/>
	</template>
	<!-- 日期时间范围选择 -->
	<template v-if="currentItem.searchType == 'datetimerange'">
		<el-date-picker
			v-model="searchParam[currentItem.prop!]"
			type="datetimerange"
			value-format="YYYY-MM-DD HH:mm:ss"
			range-separator="至"
			start-placeholder="开始时间"
			end-placeholder="结束时间"
			:clearable="clearable(item)"
		/>
	</template>
</template>

<script setup lang="ts" name="searchFormItem">
import { ref, onMounted, nextTick } from "vue";
import { ColumnProps } from "@/components/BasicTable/types/table";
import { filterEnumColor } from "@/utils/util";

interface SearchFormItem {
	item: Partial<ColumnProps>; // 具体每一个搜索项的配置
	searchParam: any; // 搜索参数
	search?: (params: any) => void; // 搜索方法
}

const props = defineProps<SearchFormItem>();
let currentItem = ref<Partial<ColumnProps>>(props.item);
let initValue = ref();

// 是否有清除按钮 (当搜索项有默认值时，清除按钮不显示)
const clearable = (item: Partial<ColumnProps>) => {
	return item.initSearchParam == null || item.initSearchParam == undefined;
};

// 异步获取选项数据
const setSearchItemEnum = async (column: Partial<ColumnProps>) => {
	if (column.enumApi) {
		const { data } = await column.enumApi({});
		setLabelAndValue(data, column);
		column.enum = data;
	}

	return column;
};

// 设置 label 和 value 值
function setLabelAndValue(data: any, base: Partial<ColumnProps>) {
	if (data && data.length > 0) {
		data.forEach((item: any) => {
			item.value = item.id;
			item.label = item.name;
			if (item.children && item.children.length > 0) {
				setLabelAndValue(item.children, base);
			}

			// 子集
			if (!item.children || item.children.length == 0) {
				setInitValue(item.value, base);
			}
		});
	}
}

// 初始化参数赋值
const setInitValue = (value: string, res: Partial<ColumnProps>) => {
	if (!initValue.value) {
		initValue.value = value;
		res.initSearchParam = initValue.value;
		props.searchParam[currentItem.value.prop!] = res.initSearchParam;
		changeItem(res);
	}
};

// 选项变更
const changeItem = (item: Partial<ColumnProps>) => {
	if (item.isQueryOnChange && props.search) {
		props.search(props.searchParam);
	}
};
onMounted(() => {
	setSearchItemEnum(props.item).then(res => {
		nextTick(() => {
			// 此处如果使用 currentItem.value = res，系统不会重新渲染页面！！！
			currentItem.value = Object.assign({}, res);
		});
	});
});
</script>
