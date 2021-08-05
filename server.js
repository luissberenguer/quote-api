const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    let rElement = getRandomElement(quotes);
    let rQuote = {
        quote: rElement
    }
    res.status(200).send(rQuote);
})



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})