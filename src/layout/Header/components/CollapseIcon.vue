<!--
 * @Description: 
 * @Autor: hl
 * @Date: 2022-07-12 09:58:47
 * @LastEditors: hl
 * @LastEditTime: 2022-07-12 10:03:16
-->
<template>
	<el-icon class="collapse-icon" @click="menuStore.setCollapse()">
		<component :is="isCollapse ? 'expand' : 'fold'"></component>
	</el-icon>
</template>
<script setup lang="ts" name="CollapseIcon">
import { computed } from "vue";
import { MenuStore } from "@/store/modules/menu";
const menuStore = MenuStore();
const isCollapse = computed((): boolean => menuStore.isCollapse);
</script>
<style lang="scss">
@import "../index.scss";
</style>
