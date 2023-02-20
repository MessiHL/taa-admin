/**
 * 操作类型
 */
export enum OptionTypeEnum {
	/**
	 * 0 - 查看
	 */
	VIEW = 0,
	/**
	 * 1 - 新增
	 */
	ADD = 1,
	/**
	 * 2 - 编辑
	 */
	EDIT = 2,
	/**
	 * 3 - 删除
	 */
	DELETE = 3,
	/**
	 * 4 - 添加下级
	 */
	ADD_CHILD = 4,
	/**
	 * 5 - 新增顶级
	 */
	ADD_TOP = 5,
	/**
	 * 6 - 批量删除
	 */
	BATCH_DELETE
}
