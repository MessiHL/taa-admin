/*
 * @Description:
 * @Autor: hl
 * @Date: 2022-07-11 15:27:16
 * @LastEditors: hl
 * @LastEditTime: 2022-07-11 15:27:32
 */
import { PersistedStateOptions } from "pinia-plugin-persistedstate";

/**
 * @description pinia持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @return persist
 * */
const piniaPersistConfig = (key: string) => {
	const persist: PersistedStateOptions = {
		key,
		storage: window.localStorage
		// storage: window.sessionStorage,
	};
	return persist;
};

export default piniaPersistConfig;
