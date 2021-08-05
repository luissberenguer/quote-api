const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));


app.get('/api/quotes/random', (req, res, next) => {
    let rElement = getRandomElement(quotes);
    let rQuote = {quote: rElement}
    res.status(200).send(rQuote);
})


app.get('/api/quotes', (req, res, next) => {
    let person = req.query.person;
    let newQuote = req.query.quote;

    if(person){
        let personQuotes = [];
        quotes.forEach(obj => {
            if(obj.person.toLowerCase() === person.toLowerCase()){
                personQuotes.push(obj);
            }
        })
        res.status(200).send({quotes: personQuotes})
    } else if(!newQuote){
        let allQuotes = {quotes: quotes}
        res.status(200).send(allQuotes);
    }
})

app.post('/api/quotes', (req, res, next) => {
    let newQuote = req.query.quote;
    let newPerson = req.query.person;
    
    if(newQuote && newPerson){
        let newElement = {quote: newQuote, person: newPerson};
        quotes.push(newElement);
        res.status(201).send({quote: newElement});
    } else {
        res.status(400).send();
    }
})



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})