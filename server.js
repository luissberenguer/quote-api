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


app.get('/api/quotes', (req, res, next) => {
    let person = req.query.person;
    
    if(!person){
        let allQuotes = {
            quotes: quotes
        }
        res.send(allQuotes);
    } else {
        
        let personQuotes = [];
        quotes.forEach(obj => {
            if(obj.person === person){
                personQuotes.push(obj);
            }
        })
        res.send({
            quotes: personQuotes   
        })
    }

})


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})