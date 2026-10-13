const assert = require('assert');
const http = require('http');
const server = require('./server');

const TEST_PORT = 8081;

server.listen(TEST_PORT, () => {
  http.get(`http://localhost:${TEST_PORT}/health`, (res) => {
    assert.strictEqual(res.statusCode, 200, 'Expected status code 200');
    
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      const data = JSON.parse(rawData);
      assert.strictEqual(data.status, 'healthy', 'Expected status to be healthy');
      console.log('Unit test passed: /health endpoint returned 200 OK');
      server.close(() => process.exit(0));
    });
  }).on('error', (err) => {
    console.error('Test failed with error:', err);
    server.close(() => process.exit(1));
  });
});
