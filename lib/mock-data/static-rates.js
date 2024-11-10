const staticRates = {
  USD: { USD: 1.0, EUR: 0.9314, GBP: 0.7733, NGN: 1669.3421, INR: 84.4014 },
  EUR: { USD: 1.0736, EUR: 1.0, GBP: 0.8307, NGN: 1796.9082, INR: 90.7068 },
  GBP: { USD: 1.2931, EUR: 1.2038, GBP: 1.0, NGN: 2181.3517, INR: 109.1613 },
  NGN: {
    USD: 0.00059904,
    EUR: 0.00055651,
    GBP: 0.00045844,
    NGN: 1.0,
    INR: 0.05005,
  },
  INR: { USD: 0.01185, EUR: 0.01102, GBP: 0.009166, NGN: 19.9811, INR: 1.0 },
};

export default staticRates;