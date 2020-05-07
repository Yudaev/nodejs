const express = require('express');
const consolidate = require('consolidate');
const path = require('path');

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views'));

const users = {
    vasya: {
        username: 'Vasily',
        age: 40,
        achivments: [
            'Top performer', 'Active person'
        ]
    },
    kolya: {
        username: 'Kolya',
        achivments: [
            'Well'
        ]
    }
};

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
    //console.log(req.headers);
    if(req.headers.sample === 'value'){
        req.sample = 'Hello';
    }
    next();
});

app.use('/users', (req, res, next) => {
    //console.log('middleware2');
    next();
});

app.all('/users', (req, res, next) => {
    console.log('all');
    next();
});

app.get('/', (req, res) => {
    //console.log(req.query);
    res.send('Hello111');
});

app.get('/users/:username', (req, res) => {
    const user = users[req.params.username]
    console.log(req.params.username);
    console.log(user);
    res.render('user', user);
});

app.post('/users', (req, res) => {
    console.log(req.sample);
    res.send('OK');
});

app.post('/settings', (req, res) => {
    console.log(req.body);
    res.render('user', {});
});

app.listen(3000, () => {
    console.log('Server started');
});