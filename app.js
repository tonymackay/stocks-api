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
    var query = req.params.query.toUpperCase();
    const result = data.filter(
        it => it.symbol.startsWith(query) || it.description.includes(query)
    );    
    res.json(result)
})

app.get('/quote/:id', async (req, res, next) => {
    try {
        const symbol = req.params.id;
        const result = await yahoo.quote(symbol, ['price']);
        res.json(result)    
    } catch (error) {
        return next(error)
    }
})

app.use((error, req, res, next) => {
    console.log(error)
    if (error.message.indexOf('Failed to download data') !== -1) {
        res.status(404)
        res.json({ error: 'Symbol does not exit' })
    } else {
        res.status(400)
    }
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))