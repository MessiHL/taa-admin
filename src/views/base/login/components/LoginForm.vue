<template>
	<el-form ref="loginFormRef" :model="loginForm" size="large">
		<el-form-item prop="username">
			<el-input v-model="loginForm.username" placeholder="用户名：user"> </el-input>
		</el-form-item>

		<el-from-item prop="password">
			<el-input v-model="loginForm.password" placeholder="密码：1" show-password autocomplete="new-password"></el-input>
		</el-from-item>
	</el-form>
	<div class="login-btn">
		<el-button round @click="resetForm(loginFormRef)" size="large">重置</el-button>
		<el-button round @click="login(loginFormRef)" size="large" type="primary"> 登录 </el-button>
	</div>
</template>
<script setup lang="ts" name="LoginForm">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import type { ElForm } from "element-plus";
// 定义 formRef
type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
const router = useRouter();
const loginForm = reactive({
	username: "user",
	password: "1"
});

const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};

const login = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	// TODO 存储token、 登录成功之后清除上个账号的 menulist 和 tabs 数据
	router.push({ name: "home" });
};
</script>
<style lang="scss">
@import "../index.scss";
</style>
