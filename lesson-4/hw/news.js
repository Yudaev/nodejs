/*
Создать на основе express и handlebars веб-сервис с HTMLинтерфейсом 
для динамической загрузки информации с одного из
нескольких сайтов в выбранном формате. Зайдя на этот сервис,
пользователь сможет с помощью формы настроить параметры
информационной подборки (например, количество отображаемых
новостей или их категорию) и получить ее в удобном виде. Форма
должна отправляться на сервер методом POST.
*/
const cheerio = require('cheerio');
const express = require('express');
const consolidate = require('consolidate');
const path = require('path');
const axios = require('axios');

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

getNews = (count) => axios.get('https://rbc.ru/')
    .then(({data}) => {
        const $ = cheerio.load(data);
        const news = $('.main__feed__title');
        let newsForWeb = [];
        if(!count) count = news.length;
        for(let i = 0; i < count; i++){
            newsForWeb[i] = news.eq(i).text();
        } 
        return newsForWeb;
    });

app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/news/', async (req, res) => {
    const news = {list: await getNews()}
    res.render('news', news);
});

app.post('/news/', async (req, res) => {
    const news = {list: await getNews(req.body.count), count: req.body.count}
    res.render('news', news);
});

app.listen(3000, () => {
    console.log('Server started');
});