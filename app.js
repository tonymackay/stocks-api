const express = require('express')
const yahoo = require('yahoo-finance');
const app = express()
const port = 8080

var data;

try {
   data = require('./symbols.json');
} catch (error) {
    console.log(error)
}

app.get('/search/:query?', (req, res) => {
    var query = req.params.query.toUpperCase()
    const result = data.filter(
        it => it.symbol.startsWith(query) || it.description.includes(query)
    )
    const newArray = result.map(({displaySymbol, ...keepAttrs}) => keepAttrs)
    res.json(newArray)
})

app.get('/quote', async (req, res, next) => {

    var response = []
    const symbol = req.query.symbol;

    if (typeof symbol === 'undefined') {
        res.statusCode = 404
        return res.json(response)
    }

    if (Array.isArray(symbol)) {
        symbol.forEach(element => response.push({
            symbol: element.toUpperCase(),
            price: 0,
            previousPrice: 0,
            currency: ''
        }))
    } else {
        response.push({
            symbol: symbol.toUpperCase(),
            price: 0,
            previousPrice: 0,
            currency: ''
        })
    }

    // query yahoo api
    try {
        if (response.length == 1) {
            const result = await yahoo.quote(symbol);
            parseResult(result, response)
        } else if (response.length > 1) {
            const symbols = {
                "symbols": response.map(a => a.symbol)
            }
            const result = await yahoo.quote(symbols)
            parseResult(result, response)
        }
    } catch (error) {
        response.forEach(element => {
            if (error.message.indexOf(element.symbol) !== -1) {
                const errorResponse = {
                    symbol: element.symbol,
                    message: 'Quote not found for ticker symbol: ' + element.symbol
                }
                res.statusCode = 400
                response = errorResponse
            }
        })
    }
    return res.json(response)
})

function parseResult(result, response) {
    response.forEach(element => {
        console.log(result[element.symbol])
        if (result[element.symbol]) {
            element.price = result[element.symbol].price.regularMarketPrice
            element.previousPrice = result[element.symbol].price.regularMarketPreviousClose
            element.currency = result[element.symbol].price.currency
        } else if (result.price) {
            element.price = result.price.regularMarketPrice
            element.previousPrice = result.price.regularMarketPreviousClose
            element.currency = result.price.currency
        }
    })
}

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))