const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    const quote = getRandomElement(quotes);
    res.send({quote: quote})
})

app.get('/api/quotes', (req, res, next) => {
    if(!req.query.hasOwnProperty('person')){
        res.send({quote: quotes})
    } else {
        const filterQuote = quotes.filter(element => element.person === req.query.person);
        res.send({quotes: filterQuote});
    }
})

app.post('/api/quotes', (req, res, next) => {
    if(req.query.quote && req.query.person){
        const newQuote = {quote: req.query.quote, person: req.query.person};
        quotes.push(newQuote);
        res.send({quote: newQuote})
    } 
    else {
        res.status(400).send()
    }
})

// Update one quote
app.post('/api/quotes:id', (req, res, next) => {
    if((req.query.person && req.query.quote) && quotes[req.params.id]){
        let newQuote = {quote: req.query.quote, person: req.query.person};
        quotes[req.params.id] = newQuote;
        send.status(200).send();
    }
    else {
        res.status(400).send()
    }
}) 

// Delete one quote
app.post('/api/quotes:id', (req, res, next) => {
    if(quotes[req.params.id]){
        quotes.splice(req.params.id, 1)
        res.status(204).send();
    } else {
        res.status(404).send()
    }
})


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})