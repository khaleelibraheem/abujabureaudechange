export async function getLiveRates(baseCurrency) {
  try {
    const response = await fetch(`/api/exchange-rates?base=${baseCurrency}`);
    if (!response.ok) throw new Error("Failed to fetch rates");
    return response.json();
  } catch (error) {
    console.error("Error fetching rates:", error);
    throw error;
  }
}

export async function getHistoricalRates(
  baseCurrency,
  targetCurrency,
  apiKey,
  days = 30
) {
  try {
    const promises = [];
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      // Format date components without leading zeros
      const year = d.getFullYear();
      const month = d.getMonth() + 1; // getMonth() returns 0-11
      const day = d.getDate();

      const url = `https://v6.exchangerate-api.com/v6/${apiKey}/history/${baseCurrency}/${year}/${month}/${day}`;

      promises.push(fetch(url).then((res) => res.json()));
    }

    const responses = await Promise.all(promises);
    return responses.map((response) => ({
      date: response.time_stamp,
      rate: response.conversion_rates[targetCurrency],
    }));
  } catch (error) {
    console.error("Error fetching historical rates:", error);
    throw error;
  }
}
