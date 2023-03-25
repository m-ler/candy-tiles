import mime from 'mime';

export const downloadBase64File = (fileName: string, extension: string, base64: string) => {
	const mimeType = mime.getType(extension) || '';
	const anchor = document.createElement('a');
	anchor.href = `data:${mimeType};base64,${base64}`;
	anchor.download = `${fileName}.${mime.getExtension(mimeType)}`;
	anchor.click();
};
