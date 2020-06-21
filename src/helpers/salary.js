// Fonte: https://www.todacarreira.com/calculo-salario-liquido/

const INSS_TABLE = [
  {
    id: 1,
    minValue: 0,
    maxValue: 1045,
    difference: 1045 - 0,
    discountPercentage: 0.075,
    discountValue: -1,
  },
  {
    id: 2,
    minValue: 1045.01,
    maxValue: 2089.6,
    difference: 2089.6 - 1045,
    discountPercentage: 0.09,
  },
  {
    id: 3,
    minValue: 2089.61,
    maxValue: 3134.4,
    difference: 3134.4 - 2089.6,
    discountPercentage: 0.12,
  },
  {
    id: 4,
    minValue: 3134.41,
    maxValue: 6101.06,
    difference: 6101.06 - 3134.4,
    discountPercentage: 0.14,
  },
];

function round(value) {
  return +value.toFixed(2);
}

function calculateinssDiscount(inssBase) {
  let inssDiscount = 0;

  if (inssBase > 6101.07) {
    return 713.1;
  }

  for (var i = 0; i < INSS_TABLE.length; i++) {
    var currentItem = INSS_TABLE[i];
    let discountValue = 0;

    if (inssBase > currentItem.maxValue) {
      // prettier-ignore
      discountValue =
        round(currentItem.difference * currentItem.discountPercentage);

      inssDiscount += discountValue;
    } else {
      // prettier-ignore
      discountValue =
        round((inssBase - currentItem.minValue) * currentItem.discountPercentage);

      inssDiscount += discountValue;
      break;
    }
  }

  inssDiscount = round(inssDiscount);

  return inssDiscount;
}

function calculateirpfDiscount(irpfBase) {
  let irpfDiscount =
    irpfBase < 1903.98
      ? 0
      : irpfBase < 2826.65
        ? round(irpfBase * 0.075) - 142.8
        : irpfBase < 3751.05
          ? round(irpfBase * 0.15) - 354.8
          : irpfBase < 4664.68
            ? round(irpfBase * 0.225) - 636.13
            : round(irpfBase * 0.275) - 869.36;

  irpfDiscount = round(irpfDiscount);

  return irpfDiscount;
}

function calculateSalaryFrom(fullSalary) {
  const inssBase = fullSalary;
  const inssDiscount = calculateinssDiscount(inssBase);

  const irpfBase = inssBase - inssDiscount;
  const irpfDiscount = calculateirpfDiscount(irpfBase);

  const netSalary = inssBase - inssDiscount - irpfDiscount;

  return {
    inssBase,
    inssDiscount,
    irpfBase,
    irpfDiscount,
    netSalary,
  };
}

export { calculateSalaryFrom };
