<!--
 * @Description: 
 * @Autor: hl
 * @Date: 2022-07-12 10:06:20
 * @LastEditors: hl
 * @LastEditTime: 2022-07-12 10:16:33
-->
<!--
 * @Description: 
 * @Autor: hl
 * @Date: 2022-07-12 10:06:20
 * @LastEditors: hl
 * @LastEditTime: 2022-07-12 10:14:34
-->
<template>
	<el-breadcrumb :separator-icon="ArrowRight">
		<transition-group name="breadcrumb" mode="out-in">
			<el-breadcrumb-item :to="{ path: HOME_URL }" key="home">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="item in matched" :key="item.path" :to="{ path: item.path }">
				{{ item.meta.title }}
			</el-breadcrumb-item>
		</transition-group>
	</el-breadcrumb>
</template>
<script setup lang="ts" name="Breadcrumb">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { ArrowRight } from "@element-plus/icons-vue";
import { HOME_URL } from "@/config";

const route = useRoute();

const matched = computed(() => route.matched.filter(item => item.meta && item.meta.title && item.meta.title !== "首页"));
</script>
<style lang="scss">
@import "../index.scss";
</style>
