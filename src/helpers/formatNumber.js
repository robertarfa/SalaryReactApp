function moneyFormat(value) {
	const formatter = Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	});
	return formatter.format(value);
}

function percentFormat(value) {
	Number.isNaN(value) ? (value = 0) : (value *= 100);
	return `${value.toFixed(2)}`;
}

export { moneyFormat, percentFormat };