<!--
 * @Description: 
 * @Autor: hl
 * @Date: 2022-07-12 15:38:17
 * @LastEditors: hl
 * @LastEditTime: 2022-07-14 15:34:54
-->
<template>
	<el-pagination
		small
		:currentPage="pageable.current_page"
		:page-size="pageable.page_size"
		:page-sizes="[50, 100, 500, 1000, 2000]"
		:background="true"
		:layout="PAGINATION_LAYOUT"
		:total="pageable.total"
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
	></el-pagination>
</template>

<script setup lang="ts" name="pagination">
import { PAGINATION_LAYOUT } from "@/config";
interface Pageable {
	current_page: number;
	page_size: number;
	total: number;
}

interface PaginationProps {
	pageable: Pageable;
	handleSizeChange: (size: number) => void;
	handleCurrentChange: (currentPage: number) => void;
}

defineProps<PaginationProps>();
</script>
