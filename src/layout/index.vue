<!--
 * @Description: 
 * @Autor: hl
 * @Date: 2022-07-11 17:21:55
 * @LastEditors: hl
 * @LastEditTime: 2022-07-14 15:37:44
-->
<template>
	<el-container>
		<el-aside v-if="isDevelopment"><Menu></Menu></el-aside>
		<el-container>
			<el-header v-if="isDevelopment"> <Header></Header> <Tabs></Tabs> </el-header>
			<el-main>
				<section class="main-box">
					<router-view v-slot="{ Component, route }">
						<keep-alive>
							<component :is="Component" :key="route.path"></component>
						</keep-alive>
					</router-view>
				</section>
			</el-main>
			<!-- <el-footer><Footer></Footer></el-footer> -->
		</el-container>
	</el-container>
</template>
<script setup lang="ts" name="Layout">
import Menu from "./Menu/index.vue";
import Header from "./Header/index.vue";
import Tabs from "./Tabs/index.vue";
import { ref } from "vue";
const isDevelopment = ref(import.meta.env.MODE === "development");
</script>
<style lang="scss">
@import "./index.scss";
</style>
