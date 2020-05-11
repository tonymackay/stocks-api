# stocks-api
`stocks-api` is a RESTful API written in Node.js that allows you to search for company symbols on the US and London stock exchanges. You can also get price information for a symbol using the quote endpoint.

## Build instructions

Clone the repository
```
git clone https://github.com/tonymackay/stocks-api.git
```

Build the Docker image
```
docker build -t stocks-api .
```

Run the container
```
docker run -p 80:8080 -d --restart unless-stopped stocks-api 
```

## Usage instructions
The API currently exposes two endpoints. 

### Search for Company Symbols 
Returns an array of companies where the name or symbol contains the text in the query parameter.

- **URL:** /search/[query]
- **Method:** GET

**Example:** /search/tesla

```
[
    {
        "description": "TESLA INC",
        "displaySymbol": "TSLA",
        "symbol": "TSLA"
    }
]
```

### Get Price info for a Symbol

- **URL:** /quote/[symbol]
- **Method:** GET

**Example:** /quote/tsla

```
{
    "price": {
        "maxAge": 1,
        "preMarketChangePercent": -0.035671502,
        "preMarketChange": -29.23,
        "preMarketTime": "2020-05-11T13:29:57.000Z",
        "preMarketPrice": 790.19,
        "preMarketSource": "FREE_REALTIME",
        "postMarketChangePercent": -0.0049180817,
        "postMarketChange": -3.9899902,
        "postMarketTime": "2020-05-11T20:53:58.000Z",
        "postMarketPrice": 807.3,
        "postMarketSource": "DELAYED",
        "regularMarketChangePercent": -0.009921658,
        "regularMarketChange": -8.130005,
        "regularMarketTime": "2020-05-11T20:00:02.000Z",
        "priceHint": 2,
        "regularMarketPrice": 811.29,
        "regularMarketDayHigh": 824,
        "regularMarketDayLow": 785,
        "regularMarketVolume": 16172840,
        "regularMarketPreviousClose": 819.42,
        "regularMarketSource": "FREE_REALTIME",
        "regularMarketOpen": 790.51,
        "exchange": "NMS",
        "exchangeName": "NasdaqGS",
        "exchangeDataDelayedBy": 0,
        "marketState": "POST",
        "quoteType": "EQUITY",
        "symbol": "TSLA",
        "underlyingSymbol": null,
        "shortName": "Tesla, Inc.",
        "longName": "Tesla, Inc.",
        "currency": "USD",
        "quoteSourceName": "Delayed Quote",
        "currencySymbol": "$",
        "fromCurrency": null,
        "toCurrency": null,
        "lastMarket": null,
        "marketCap": 150389637120
    }
}
```

## License

The MIT License (MIT)

Copyright (c) 2020 Tony Mackay

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.