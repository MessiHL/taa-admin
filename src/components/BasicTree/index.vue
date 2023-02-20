<template>
	<div class="card filter">
		<h4 class="title sle" v-if="title">{{ title }}</h4>
		<el-input v-model="filterText" placeholder="输入区划名称进行过滤" clearable />
		<el-scrollbar :style="{ height: title ? `calc(100% - 95px)` : `calc(100% - 56px)` }">
			<el-tree
				ref="treeRef"
				default-expand-all
				:node-key="id"
				:data="treeData"
				:show-checkbox="multiple"
				:check-strictly="false"
				:current-node-key="!multiple ? defaultValue : ''"
				:highlight-current="!multiple"
				:expand-on-click-node="false"
				:check-on-click-node="multiple"
				:props="defaultProps"
				:lazy="lazy"
				:load="loadNode"
				:filter-node-method="filterNode"
				:default-checked-keys="multiple ? defaultValue : []"
				@node-click="handleNodeClick"
				@check="handleCheckChange"
			>
				<template #default="scope">
					<span class="custom-tree-node">
						<span>{{ scope.data[codeField] }} {{ scope.data[nameField] }}</span>
						<span class="option-list">
							<a title="刷新"><Refresh style="width: 1em; height: 1em; margin-right: 8px" /></a>
							<a title="修改"><Edit style="width: 1em; height: 1em; margin-right: 8px" /></a>
							<a title="添加下级"><Plus style="width: 1em; height: 1em; margin-right: 8px" /></a>
							<a style="color: #f56c6c" title="删除"><Delete style="width: 1em; height: 1em; margin-right: 8px" /></a>
						</span>
					</span>
				</template>
			</el-tree>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts" name="BasicTree">
import { ref, watch, onBeforeMount } from "vue";
import { ElTree } from "element-plus";

// 接收父组件参数并设置默认值
interface BasicTreeProps {
	requestApi?: (data?: any) => Promise<any>; // 请求分类数据的 api ==> 非必传
	data?: { [key: string]: any }[]; // 分类数据，如果有分类数据，则不会执行 api 请求 ==> 非必传
	title?: string; // BasicTree 标题 ==> 非必传
	id?: string; // 选择的id ==> 非必传，默认为 “id”
	label?: string; // 显示的label ==> 非必传，默认为 “label”
	codeField?: string; // code 对应的字段名称
	nameField?: string; // name 对应的字段名称
	multiple?: boolean; // 是否为多选 ==> 非必传，默认为 false
	defaultValue?: any; // 默认选中的值 ==> 非必传
	lazy?: boolean;
}
const props = withDefaults(defineProps<BasicTreeProps>(), {
	id: "id",
	label: "label",
	codeField: "code",
	nameField: "name",
	lazy: true,
	multiple: false
});

const defaultProps = {
	children: "children",
	label: props.label
};

const filterText = ref<string>("");
const treeRef = ref<InstanceType<typeof ElTree>>();
const treeData = ref<{ [key: string]: any }[]>([]);

onBeforeMount(async () => {
	if (props.data?.length) return (treeData.value = props.data);
	const { data } = await props.requestApi!();
	if (props.multiple) return (treeData.value = data);
	treeData.value = [{ id: "", [props.label]: "全部" }, ...data];
});

watch(filterText, val => {
	treeRef.value!.filter(val);
});

const loadNode = async (node: any, resolve: (data: any[]) => void) => {
	let parent_id = node.data.parent_id;
	const { data } = await props.requestApi!({ parent_id });
	resolve(
		data.map((item: any) => {
			return {
				...item,
				leaf: item.level_no === 5 // 5-村
			};
		})
	);
};

// 过滤
const filterNode = (value: string, data: { [key: string]: any }, node: any) => {
	if (!value) return true;
	let parentNode = node.parent,
		labels = [node.label],
		level = 1;
	while (level < node.level) {
		labels = [...labels, parentNode.label];
		parentNode = parentNode.parent;
		level++;
	}
	return labels.some(label => label.indexOf(value) !== -1);
};

interface FilterEmits {
	(e: "change", value: any): void;
}
const emit = defineEmits<FilterEmits>();

// 单选
const handleNodeClick = (data: { [key: string]: any }) => {
	if (props.multiple) return;
	emit("change", data);
};

// 多选
const handleCheckChange = () => {
	emit("change", treeRef.value?.getCheckedKeys());
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
