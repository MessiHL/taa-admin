<!--
 * @Description: 
 * @Autor: hl
 * @Date: 2022-07-12 10:41:49
 * @LastEditors: hl
 * @LastEditTime: 2022-07-12 11:31:37
-->
<template>
	<el-dropdown trigger="click">
		<el-button size="small">
			<span>关闭</span>
			<el-icon class="el-icon--right"><arrow-down /></el-icon>
		</el-button>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="closeCurrentTab">关闭当前</el-dropdown-item>
				<el-dropdown-item @click="closeOtherTab">关闭其他</el-dropdown-item>
				<el-dropdown-item @click="closeAllTab">关闭所有</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>
<script setup lang="ts" name="MoreButton">
import { TabsStore } from "@/store/modules/tabs";
import { HOME_URL } from "@/config";
const tabStore = TabsStore();

const closeCurrentTab = () => {
	if (tabStore.tabsMenuValue === HOME_URL) return;
	tabStore.removeTabs(tabStore.tabsMenuValue);
};

const closeOtherTab = () => {
	tabStore.closeMultipleTab(tabStore.tabsMenuValue);
};

const closeAllTab = () => {
	tabStore.closeMultipleTab();
	tabStore.goHome();
};
</script>
<style lang="scss"></style>
