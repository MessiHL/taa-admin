<template>
	<div class="card select">
		<el-select v-model="currentItemId" class="m-2" clearable @change="handleNodeClick">
			<el-option v-for="item in basicSelectData" :key="item[id]" :label="item[nameField]" :value="item[id]">
				<span style="float: left; padding-right: 32px">{{ item[nameField] }}</span>
				<span style="float: right">{{ item[codeField] }}</span>
			</el-option>
		</el-select>
	</div>
</template>

<script setup lang="ts" name="BasicSelect">
import { ref, onBeforeMount } from "vue";
interface BasicSelectProps {
	requestApi?: (data?: any) => Promise<any>;
	data?: { [key: string]: any }[]; // 分类数据，如果有分类数据，则不会执行 api 请求
	initValue?: string;
	id?: string;
	codeField?: string;
	nameField?: string;
}
const currentItemId = ref("");
const props = withDefaults(defineProps<BasicSelectProps>(), {
	id: "id",
	codeField: "code",
	nameField: "name"
});
const basicSelectData = ref<{ [key: string]: any }[]>([]);
onBeforeMount(async () => {
	currentItemId.value = props.initValue || "";
	if (props.data?.length) return (basicSelectData.value = props.data);
	const { data } = await props.requestApi!();
	basicSelectData.value = data;
});

interface FilterEmits {
	(e: "change", value: any): void;
}
const emit = defineEmits<FilterEmits>();

// 单选
const handleNodeClick = (data: { [key: string]: any }) => {
	let dist = null;
	dist = basicSelectData.value.find(ele => ele.id === data);
	emit("change", dist);
};
</script>

<style scoped lang="scss"></style>
