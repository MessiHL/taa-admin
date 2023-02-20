<!--
 * @Description: 
 * @Autor: hl
 * @Date: 2022-07-18 10:52:16
 * @LastEditors: hl
 * @LastEditTime: 2022-07-19 15:49:11
-->
<template>
	<el-row :gutter="10">
		<el-col :span="2"><el-button @click="testGeekerUser">代理测试：geeker</el-button></el-col>
	</el-row>
</template>
<script setup lang="ts" name="ApiTest">
import { getUserList } from "@/api/modules/user";
const testGeekerUser = async () => {
	await getUserList({});
};
</script>
<style lang="scss" scoped></style>
