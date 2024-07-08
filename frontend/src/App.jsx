import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrencyDropdown from './components/CurrencyDropdown';
import ExchangeRatesTable from './components/ExchangeRatesTable';
import './App.css'

const App = () => {
    const [currencies, setCurrencies] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState('USD');  //default value USD
    const [exchangeRates, setExchangeRates] = useState({});

    useEffect(() => {
        axios.get('http://localhost:5000/currencies')
            .then(response => setCurrencies(response.data))
            .catch(error => console.error('Error fetching currencies:', error));
    }, []);

    useEffect(() => {
        if (selectedCurrency) {
            axios.get(`http://localhost:5000/exchange-rates/${selectedCurrency}`)
                .then(response => {
                    setExchangeRates(response.data);
                })
                .catch(error => console.error('Error fetching exchange rates:', error));
        }
    }, [selectedCurrency]);
    
    return (
        <div>
            <h1>Exchange Rates</h1>
            <CurrencyDropdown
                currencies={currencies}
                selectedCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
            />
            <ExchangeRatesTable
                baseCurrency={selectedCurrency}
                exchangeRates={exchangeRates}
            />
        </div>
    );
};

export default App;