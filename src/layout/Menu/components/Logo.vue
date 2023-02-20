<!--
 * @Description: 
 * @Autor: hl
 * @Date: 2022-07-12 08:44:27
 * @LastEditors: hl
 * @LastEditTime: 2022-07-12 09:53:59
-->
<template>
	<div class="logo flx-center">
		<img src="@/assets/images/logo.svg" alt="logo" />
		<span v-show="!isCollapse">旅行社助手</span>
	</div>
</template>
<script setup lang="ts" name="MenuLogo">
defineProps<{ isCollapse: boolean }>();
</script>
<style lang="scss">
@import "../index.scss";
</style>
