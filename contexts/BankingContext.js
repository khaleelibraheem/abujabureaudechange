// contexts/BankingContext.js
"use client";

import React, { createContext, useContext, useState } from "react";

const BankingContext = createContext({});

// Initial bank accounts for testing
const initialBankAccounts = [
  {
    id: 1,
    bankName: "Chase Bank",
    accountNumber: "****1234",
    accountType: "Savings",
  },
  {
    id: 2,
    bankName: "Bank of America",
    accountNumber: "****5678",
    accountType: "Checking",
  },
  {
    id: 3,
    bankName: "Wells Fargo",
    accountNumber: "****9012",
    accountType: "Savings",
  },
];

export function BankingProvider({ children }) {
  // Balances state with initial values from your balance cards
  const [balances, setBalances] = useState({
    USD: 140.5,
    GBP: 3850.2,
    EUR: 4120.8,
    NGN: 50000.0,
    INR: 5000.75,
  });

  const [bankAccounts, setBankAccounts] = useState(initialBankAccounts);
  const [transactions, setTransactions] = useState([]);

  // Function to handle funding
  const handleFunding = (amount, currency) => {
    setBalances((prev) => ({
      ...prev,
      [currency]: prev[currency] + parseFloat(amount),
    }));

    // Add to transactions history
    setTransactions((prev) => [
      {
        id: Date.now(),
        type: "credit",
        amount: parseFloat(amount),
        currency,
        date: new Date(),
        status: "completed",
      },
      ...prev,
    ]);
  };

  // Function to handle withdrawal
const handleWithdrawal = (amount, currency) => {
  const withdrawalAmount = parseFloat(amount);

  if (balances[currency] >= withdrawalAmount) {
    setBalances((prev) => ({
      ...prev,
      [currency]: Number((prev[currency] - withdrawalAmount).toFixed(2)),
    }));

    setTransactions((prev) => [
      {
        id: Date.now(),
        type: "debit",
        amount: withdrawalAmount,
        currency,
        date: new Date(),
        status: "completed",
      },
      ...prev,
    ]);

    return true;
  }
  return false;
};

  // Function to add a new bank account
  const addBankAccount = (bankAccount) => {
    setBankAccounts((prev) => [...prev, { id: Date.now(), ...bankAccount }]);
  };

  return (
    <BankingContext.Provider
      value={{
        balances,
        bankAccounts,
        transactions,
        handleFunding,
        handleWithdrawal,
        addBankAccount,
      }}
    >
      {children}
    </BankingContext.Provider>
  );
}

export const useBanking = () => {
  const context = useContext(BankingContext);
  if (context === undefined) {
    throw new Error("useBanking must be used within a BankingProvider");
  }
  return context;
};
