const test = require('node:test');
const assert = require('node:assert');
const server = require('../server.js');

test('uh oh route returns expected page', async () => {
  const app = server.listen(9876);
  const response = await fetch('http://localhost:9876/uh-oh');
  app.close();


  assert.equal(response.status, 500);
  const body = await response.text();
  assert.equal(body, 'something went wrong');
});
