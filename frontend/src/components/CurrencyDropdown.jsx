import React from 'react';


const CurrencyDropdown = ({ currencies, selectedCurrency, onCurrencyChange }) => {
    return (
        <select value={selectedCurrency} onChange={(e) => onCurrencyChange(e.target.value)}>
            {currencies.map((currency) => (
                <option key={currency} value={currency}>
                    {currency}
                </option>
            ))}
        </select>
    );
};

export default CurrencyDropdown;