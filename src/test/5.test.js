const test = require('node:test');
const assert = require('node:assert');
const server = require('../server.js');

test('missing routes return 404', async () => {
	const app = server.listen(9876);
	const response = await fetch('http://localhost:9876/fake-route');
	const body = await response.text();
	app.close();

	assert.equal(response.status, 404);
	assert.match(body, /Not found/);
});

test('server error returns 500', async () => {
	const app = server.listen(9876);
	const response = await fetch('http://localhost:9876/error');
	const body = await response.text();
	app.close();

	assert.equal(response.status, 500);
	assert.match(body, /Something went wrong/);
});
