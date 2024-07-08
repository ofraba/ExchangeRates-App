from typing import Dict, List
from fastapi import FastAPI, HTTPException 
from fastapi.middleware.cors import CORSMiddleware 
import httpx  # type: ignore

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

currencies = ["USD", "EUR", "GBP", "CNY", "ILS"]

#defines a synchronous endpoint to return the list of supported currencies.
@app.get("/currencies", response_model=List[str])
def get_currencies():
    return currencies

#defines an asynchronous endpoint to get exchange rates for a given base currency.
@app.get("/exchange-rates/{base_currency}", response_model=Dict[str, float])
async def get_exchange_rates(base_currency: str):
    if base_currency not in currencies:
        raise HTTPException(status_code=400, detail="Invalid base currency")
    
    #constructs the URL for the exchange rate API request.
    url = f"https://api.exchangerate-api.com/v4/latest/{base_currency}"
    #creates an asynchronous HTTP client with SSL verification disabled.
    async with httpx.AsyncClient(verify=False) as client: 
        response = await client.get(url)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Error fetching exchange rates")
    
    data = response.json()
    #constructs a dictionary of exchange rates for the supported currencies, excluding the base currency
    rates = {currency: data["rates"].get(currency, None) for currency in currencies if currency != base_currency}
    return rates

if __name__ == "__main__":
    import uvicorn # type: ignore
    uvicorn.run(app, host="0.0.0.0", port=5000)
