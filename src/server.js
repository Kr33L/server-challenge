const express = require('express');
const server = express();

const bodyParser = express.urlencoded();
const staticHandler = express.static('src/public');
const notFoundHandler = errorHandler('notFound');
const serverErrorHandler = errorHandler('serverError');

const cheeses = [];

server.use(staticHandler);
server.use(logger);

server.get('/', logger, (request, response) => {
	response.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <link rel="stylesheet" type="text/css" href="style.css" />
      <title>Home</title>
    </head>
    <body>
      <h1>Hello Express</h1>
    </body>
  </html>
  `);
});

server.get('/colour', (request, response) => {
	const { hex } = request.query || 'fff';
	response.send(`
    <style>
      body {
        background-color: ${hex};
      }
    </style>
    <form>
      <label for="hex">Enter hex (or color name)</label>
      <input name="hex" value="${hex}">
      <button>submit</button>
    </form>
    `);
});

server.get('/cheese', (request, response) => {
	const cheeseList = cheeses.map((cheese) => `<li>${cheese.name} - ${cheese.rating}</li>`);

	response.send(`
  <form method="POST">
  <div>
    <label for="name">Enter cheeseman</label>
    <input name="name" />
  </div>
  <div>
    <label for="rating">Cheese rating</label>
    <input name="rating" type="range" min="0" max="5" step="0.5" />
  </div>
    <button>Rate cheese</button>
  </form>
  <ul>${cheeseList.join('')}</ul>
  `);
});

server.post('/cheese', express.urlencoded({ extended: false }), (req, res) => {
	const { name, rating } = req.body;
	cheeses.push({ name, rating });
	res.redirect('/cheese');
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

server.post('/submit', bodyParser, (request, response) => {
	const { name } = request.body;
	response.send(`Thanks for submitting the form, ${name}!`);
	response.redirect(`/submit/success?name=${name}`);
});

server.get('/submit/success', (request, response) => {
	const { name } = request.query;
	response.send(`<p>Thanks for submitting the form, ${name}!</p>`);
});

server.use((request, response, next) => {
	if (!request.route) {
		notFoundHandler(request, response);
	}
	next();
});

server.use((error, request, response, next) => {
	console.error(error.stack);
	serverErrorHandler(request, response);
	next();
});

function logger(request, response, next) {
	console.log(request.method + ' ' + request.url);
	next();
}

function errorHandler(type) {
	switch (type) {
		case 'notFound':
			return (request, response) => {
				response.status(404).send('Not found');
			};
		case 'serverError':
			return (request, response) => {
				request.route = '/error';
				response.status(500).send('Something went wrong');
			};
		default:
			throw new Error('Unknown error: ${type}');
	}
}

module.exports = server;
