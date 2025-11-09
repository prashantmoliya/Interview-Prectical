import React, { useContext } from 'react';

import { CurrencyContext } from '../context/CurrencyContext';

const useCurrency = () => {

    const { currency } = useContext(CurrencyContext);
    
    return currency;
}

export default useCurrency;