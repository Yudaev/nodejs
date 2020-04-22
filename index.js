const ansi = require('ansi');
const cursor = ansi(process.stdout);

cursor.white().bg.red().write('Welcome to node.js').reset().bg.reset();