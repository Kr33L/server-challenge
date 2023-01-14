const test = require('node:test');
const assert = require('node:assert');
const server = require('../server.js');

test('search returns message including keyword', async () => {
	const app = server.listen(9876);
	const response = await fetch('http://localhost:9876/search?keyword=bananas');
	const body = await response.text();
	app.close();

	assert.equal(response.status, 200);
	assert.match(body, /You searched for bananas/);
});
