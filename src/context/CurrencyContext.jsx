import { createContext, useState, useContext } from "react";

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    if (typeof window === 'undefined') return "USD";
    return localStorage.getItem('currency') || "USD";
  });
  const rates = { USD: 1, EUR: 0.93, UZS: 12600, KZT: 480, RUB: 95, TRY: 34 };

  const convert = (usdValue) => (usdValue * (rates[currency] || 1)).toFixed(2);

  const setCurrencyPersist = (val) => {
    setCurrency(val);
    try { localStorage.setItem('currency', val); } catch {}
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: setCurrencyPersist, convert }}>
      {children}
    </CurrencyContext.Provider>
  );
};
