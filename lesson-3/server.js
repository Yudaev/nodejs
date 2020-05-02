const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    const query = url.parse(req.url, true);
    console.log(query);
    res.writeHead(200, {
        'Content-type': 'application/json',
    });
    res.write(JSON.stringify({message: 'It\'s 200 response message'}));
    res.end();
}).listen(3000);