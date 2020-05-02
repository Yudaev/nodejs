const request = require('request');
const cheerio = require('cheerio');

request('https://www.banki.ru/products/currency/', (err, res, body) => {
    if(!err && res.statusCode === 200){
        const $ = cheerio.load(body);

        //const usd = $('[data-currency-code="USD"] td:nth-child(2)').text();
        const usd = $('[data-currency-code="USD"] td').eq(1).text();

        console.log(usd);
    }
});