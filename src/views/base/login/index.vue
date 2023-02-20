<!--
 * @Description: 
 * @Autor: hl
 * @Date: 2022-07-11 15:22:30
 * @LastEditors: hl
 * @LastEditTime: 2022-07-11 17:30:22
-->
<template>
	<div class="login-container flx-center">
		<div class="login-box">
			<div class="login-left">
				<img src="@/assets/images/login_left0.png" alt="login" />
			</div>
			<div class="login-form">
				<div class="login-logo">
					<img class="login-icon" src="@/assets/images/logo.svg" alt="" />
					<p class="logo-text">旅行社助手</p>
				</div>
				<LoginForm ref="loginRef"></LoginForm>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts" name="login">
import LoginForm from "./components/LoginForm.vue";
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
