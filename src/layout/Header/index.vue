<!--
 * @Description: 
 * @Autor: hl
 * @Date: 2022-07-11 17:51:56
 * @LastEditors: hl
 * @LastEditTime: 2022-07-12 11:44:33
-->
<template>
	<div class="header">
		<div class="header-lf flx-center">
			<CollapseIcon />
			<Breadcrumb />
		</div>
		<div class="header-ri flx-ceter">
			<Fullscreen></Fullscreen>
		</div>
	</div>
</template>
<script setup lang="ts" name="LayoutHeader">
import CollapseIcon from "./components/CollapseIcon.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
import Fullscreen from "./components/Fullscreen.vue";
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
