export const dateUTC = (year: number, month: number, day: number) => {
	return new Date(Date.UTC(year, month - 1, day));
};
