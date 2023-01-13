const test = require('node:test');
const assert = require('node:assert');
const { request } = require('./helpers.js');

test('the test works', async () => {
	const { status, body } = await request('/');

	assert.equal(status, 200);
	assert.match(body, /Hello/);
});
