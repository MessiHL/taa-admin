<template>
	<el-tooltip effect="dark" :content="isFullscreen ? '退出全屏' : '全屏'" placement="bottom">
		<i :class="['iconfont', isFullscreen ? 'icon-suoxiao' : 'icon-fangda']" class="icon-style" @click="toggle"></i>
	</el-tooltip>
</template>

<script setup lang="ts" name="Fullscreen">
import { useFullscreen } from "@vueuse/core";
const { toggle, isFullscreen } = useFullscreen();
</script>
<style lang="scss">
@import "../index.scss";
</style>
