const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// Get a random quote
app.get('/api/quotes/random', (req, res, next) => {
    const quote = getRandomElement(quotes);
    res.send({quote: quote})
})

// Get one quote
app.get('/api/quotes/:id', (req, res, next) => {
    if(quotes[req.params.id]){
        res.status(200).send(quotes[req.params.id]);
    }
 })

 // Get all quotes
app.get('/api/quotes', (req, res, next) => {
    if(!req.query.hasOwnProperty('person')){
        res.send({quote: quotes})
    } else {
        const filterQuote = quotes.filter(element => element.person === req.query.person);
        res.send({quotes: filterQuote});
    }
})


// Create a quote object
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
app.put('/api/quotes/:id', (req, res, next) => {
    // If ID exists, update quote with queries
    if(quotes[req.params.id]){
        let newQuote = Object.assign(quotes[req.params.id], req.query);
        res.status(200).send(newQuote);
    }
    else {
        res.status(404).send()
    }
}) 

// Delete one quote
app.delete('/api/quotes/:id', (req, res, next) => {
    if(quotes[req.params.id]){
        quotes.splice(req.params.id, 1)
        res.status(204).send();
    } else {
        res.status(404).send();
    }
})


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})