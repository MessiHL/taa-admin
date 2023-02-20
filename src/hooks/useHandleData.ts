import { ElMessageBox, ElMessage } from "element-plus";
/**
 * 批量处理数据
 * @param api 数据处理函数
 * @param params 参数（一般为id集合）
 * @param message 操作说明（删除、送审等）
 * @returns
 */
export const useHandleData = <P = any, R = any>(api: (params: P) => Promise<R>, params: any, message: string) => {
	return new Promise((resolve, reject) => {
		ElMessageBox.confirm(`您将要${message}【${params.length}】条数据,是否确定?`, "温馨提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning",
			draggable: true
		}).then(async () => {
			const res = await api(params);
			if (!res) return reject(false);
			ElMessage({
				type: "success",
				message: `${message}成功!`
			});
			resolve(true);
		});
	});
};

/**
 * 批量处理数据
 * @param api 数据处理函数
 * @param params 参数（一般为id集合）
 * @param message 操作说明（删除、送审等）
 * @returns
 */
export const useHandleDataOfBasSubsidyObj = <P = any, R = any>(api: (params: P) => Promise<R>, params: any, message: string) => {
	return new Promise((resolve, reject) => {
		const d = params.ids.length > 0 ? `【${params.ids.length}】条` : "所有";
		ElMessageBox.confirm(`您将要${message}${d}条数据,是否确定?`, "温馨提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning",
			draggable: true
		}).then(async () => {
			const res = await api(params);
			if (!res) return reject(false);
			ElMessage({
				type: "success",
				message: `${message}成功!`
			});
			resolve(true);
		});
	});
};
