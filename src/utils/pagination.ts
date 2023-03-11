export const getPagination = (page: number, size: number) => {
	const from = (page - 1) * (size - (page === 0 ? 1 : 0));
	const to = from + (size - 1);

	return { from, to };
};
