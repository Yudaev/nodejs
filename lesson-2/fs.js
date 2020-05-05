const fs = require('fs');
const {promisify} = require('util');

// fs.readFile('./package.json', 'utf8', (err, data) => {
//     if (err) {
//         throw err;
//     }
//
//     console.log(data);
// });

// const data = fs.readFileSync('./package.json', 'utf8');
// console.log(data);

const prom = promisify(fs.readFile);
prom(`./package.json`, "utf8")
    .then((data) => {
        console.log(data);
    });