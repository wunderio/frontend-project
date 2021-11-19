const request = require('supertest')
const app = require('../index')

describe('GET /', () => {
  it('respond with hello Silta', (done) => {
    request(app).get('/').expect('Hello Silta!', done)
  })
})
