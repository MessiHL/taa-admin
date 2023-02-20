export const useDownload = async (
	api: (param: any) => Promise<any>,
	tmplName: string = "Excel",
	params: any = {},
	fileType: string = ".xlsx"
) => {
	try {
		const res = await api(params);
		// 这个地方的 type，经测试不传也没事，因为会自动识别文件类型
		// const blob = new Blob([res], {
		// 	type: "application/vnd.ms-excel;charset=UTF-8"
		// });
		const blob = new Blob([res]);
		// 兼容edge不支持createObjectURL方法
		// if ("msSaveOrOpenBlob" in navigator) return window.navigator.msSaveOrOpenBlob(blob, tmplName + fileType);
		const blobUrl = window.URL.createObjectURL(blob);
		const exportFile = document.createElement("a");
		exportFile.style.display = "none";
		exportFile.download = `${tmplName}${fileType}`;
		exportFile.href = blobUrl;
		document.body.appendChild(exportFile);
		exportFile.click();
		// 去除下载对url的影响
		document.body.removeChild(exportFile);
		window.URL.revokeObjectURL(blobUrl);
	} catch (e) {
		console.log(e);
	}
};
export const useDownload2 = (url: string) => {
	try {
		const downloadFile = document.createElement("a");
		downloadFile.style.display = "none";
		// exportFile.download = `${tmplName}${fileType}`;
		downloadFile.href = url;
		document.body.appendChild(downloadFile);
		downloadFile.click();
		// 去除下载对url的影响
		document.body.removeChild(downloadFile);
	} catch (e) {
		console.log(e);
	}
};
