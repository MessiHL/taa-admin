/**
 * 性别。（1-男；2女；）
 */
export const genderTypeSelections = [
	{ label: "男", value: 1, color: "#409eff" },
	{ label: "女", value: 2, color: "#e6a23c" }
];

/**
 * 是否确认。(0-未确认；1-已确认；)
 */
export const confirmSelections = [
	{ value: "0", label: "未确认" },
	{ value: "1", label: "已确认" }
];
/**
 * 确认状态。NOT_CONFIRMED("未确认"),CONFIRMED("已确认"), CONFIRMING("确认中");
 */
export const confirmSelections2 = [
	{ value: "NOT_CONFIRMED", label: "未确认" },
	{ value: "CONFIRMING", label: "确认中" },
	{ value: "CONFIRMED", label: "已确认" }
];
