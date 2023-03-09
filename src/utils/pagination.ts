export const getPagination = (page: number, size: number) => {
	const from = (page - 1) * size;
	const to = from + size;

	return { from, to };
};
