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
        "symbol": "TSLA"
    }
]
```

### Get price for one or more symbols

- **Single Quote URL:** /quote?symbol=[symbol]
- **Multi Quote URL:** /quote?symbol=[symbol]&symbol=[symbol]
- **Method:** GET

**Example:** /quote?symbol=tsla&symbol=aapl

```
[
    {
        "symbol": "TSLA",
        "price": 815.56,
        "previousPrice": 808.01,
        "currency": "USD"
    },
    {
        "symbol": "AAPL",
        "price": 319.23,
        "previousPrice": 313.14,
        "currency": "USD"
    }
]
```

**Error response**

If one of the symbols does not exist, the response will fail with a status code of 400 and a response containing the failed symbol.

```
{
    "symbol": "AAPLS",
    "message": "Quote not found for ticker symbol: AAPLS"
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