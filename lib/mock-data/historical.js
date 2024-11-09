export const generateHistoricalData = (
  baseCurrency,
  targetCurrency,
  days = 30
) => {
  const data = [];
  const today = new Date();
  const baseRate = getBaseRate(baseCurrency, targetCurrency);

  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Add some realistic variation to the rates
    const volatility = 0.02; // 2% daily volatility
    const randomChange = (Math.random() - 0.5) * 2 * volatility;
    const rate = baseRate * (1 + randomChange);

    data.push({
      date: date.toISOString().split("T")[0],
      rate: Number(rate.toFixed(4)),
    });
  }

  return data;
};

// Base rates for generating historical data
const getBaseRate = (base, target) => {
  const rates = {
    USD: { EUR: 0.93, GBP: 0.77, NGN: 1681.53, INR: 84.38 },
    EUR: { USD: 1.08, GBP: 0.83, NGN: 1798.70, INR: 90.96 },
    GBP: { USD: 1.30, EUR: 1.20, NGN: 2180.54, INR: 109.44 },
    NGN: { USD: 0.00059, EUR: 0.00056, GBP: 0.00046, INR: 0.050 },
    INR: { USD: 0.012, EUR: 0.011, GBP: 0.0091, NGN: 19.76 },
  };

  return rates[base]?.[target] || 1;
};
