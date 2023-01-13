const test = require('node:test');
const assert = require('node:assert');
const server = require('../server.js');

test('missing routes return 404', async () => {
	const app = server.listen(9876);
	const response = await fetch('http://localhost:9876/fake-route');
	app.close();

	assert.equal(response.status, 404);
	const body = await response.text();
	assert.match(body, /Not found/);
});
