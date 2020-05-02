const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
        user: 'fff@gmail.com',
        pass: 'qqqq',
    }
});

smtpTransport.sendMail({
    from: 'Name Surname <aaaa@ssss.com>',
    to: 'rrrr@tttt.ru, tttt@yyyy.ru',
    subject: 'Указываем заоловок',
    text: 'текст письма',
    html: '<b>Привет</b>',
}, (err, res) => {
    if(err){
        throw err;
    }
    console.log('Письмо отправлено', res.message);

    smtpTransport.close();
});