const request = require('supertest')
const app = require('../index.js')

describe('GET /', function() {
  it('respond with hello Silta', function(done) {
    request(app).get('/').expect('Hello Silta!', done)
  })
})
