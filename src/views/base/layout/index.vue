<!--
 * @Description: 
 * @Autor: hl
 * @Date: 2022-07-15 10:25:48
 * @LastEditors: hl
 * @LastEditTime: 2022-08-01 10:37:48
-->
<template>
	<div class="split-pane">
		<splitpane :splitSet="isLR ? settingLR : settingTB">
			<!-- #paneL 表示指定该组件为左侧面板 -->
			<template #paneL>
				<!-- 自定义左侧面板的内容 -->
				<div class="pane-a"></div>
			</template>
			<!-- #paneR 表示指定该组件为右侧面板 -->
			<template #paneR>
				<div class="pane-b"></div>
			</template>
		</splitpane>
	</div>
</template>
<script setup lang="ts" name="SplitPaneDemo">
import { reactive, ref } from "vue";
import splitpane, { ContextProps } from "@/components/ResizePane";

const isLR = ref(true);

const settingLR: ContextProps = reactive({
	minPercent: 1,
	defaultPercent: 20,
	split: "vertical"
});

const settingTB: ContextProps = reactive({
	minPercent: 20,
	defaultPercent: 50,
	split: "horizontal"
});
</script>

<style lang="scss" scoped>
.split-pane {
	width: 100%;
	height: 100%;
	text-align: center;
	.pane-a {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: rgb(63 139 139);
	}
	.pane-b {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: #adebb5;
	}
}
</style>
