const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');


axios.get('https://rbc.ru/')
    .then(({data}) => {
        const $ = cheerio.load(data);
        const news = $('.main__feed__title');
        let newsForWeb = [];
        for(let i = 0; i < news.length; i++){
            newsForWeb[i] = news.eq(i).text();
        } 
        console.log(newsForWeb);
    });