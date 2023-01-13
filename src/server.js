const express = require('express');
const server = express();
module.exports = server;

server.get('/', (request, response) => {
	response.send(`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Home</title>
    </head>
    <body>
      <h1>Hello</h1>
    </body>
  </html>
  `);
});

server.get('/uh-oh', (request, response) => {
	response.status(500).send('something went wrong');
});

server.get('/search', (request, response) => {
	const { keyword } = request.query;
	response.send(`
      <h1>You searched for ${keyword}</h1>
  `);
});

server.get('/users/:name', (request, response) => {
	const { name } = request.params;
	response.send(`
      <h1>Hi ${name}</h1>
  `);
});

server.use((request, response) => {
	response.status(404).send(`
      <h1>Not found</h1>
  `);
});

server.get('/', (request, response) => {
	response.send('...');
});

server.get('/', (request, response) => {
	response.send(`
      <h1>Hello</h1>
  `);
});

function logger(request, response, next) {
	console.log(request.method + ' ' + request.url);
	next();
}

server.use('/static', express.static('public'));
server.use(logger);

server.get('/', (request, response) => {
	response.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Home</title>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <h1>Hello</h1>
      </body>
    </html>
  `);
});
