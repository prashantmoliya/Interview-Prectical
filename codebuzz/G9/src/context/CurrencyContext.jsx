import React, { createContext, useEffect, useState } from 'react'

export const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {

    const [currency, setCurrency] = useState(localStorage.getItem("currency") || "");

    useEffect(() => {
        localStorage.setItem("currency", currency);
    }, [currency]);

    const handleCurrency = (currency) => {
        setCurrency(currency);
    };

    return (
        <CurrencyContext.Provider value={{ currency, handleCurrency }}>
            {children}
        </CurrencyContext.Provider>
    )
}

export default CurrencyProvider;