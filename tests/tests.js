const request = require('supertest'); // Import supertest library
const assert = require('assert'); // Import assert library
const app = require('../app'); // Import the app

let server;
process.env.NODE_ENV = 'test';

// beforeEach({
// });
//
// afterEach(
//   process.env.NODE_ENV = 'development'
// );


describe('GET /books', () => {
  it('responds with an array of books', (done) => {
    request(app)
      .get('/books')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(Array.isArray(res.body), 'response is not an array');
        done();
      });
  });
});

describe('GET /books/:id', () => {
  it('responds with a book object when given a valid id', (done) => {
    request(app)
      .get('/books/1') // assuming there is a book with id 1 in the test environment
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(typeof res.body === 'object', 'response is not an object');
        assert(res.body.id === '1', 'response has incorrect id');
        done();
      });
  });

  it('responds with a 404 status when given an invalid id', (done) => {
    request(app)
      .get('/books/invalid-id')
      .expect(404, done);
  });
});

describe('POST /books', () => {
  it('creates a new book', (done) => {
    const newBook = { title: 'New Book', author: 'Jane Doe', price: 9.99 };
    request(app)
      .post('/books')
      .send(newBook)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(typeof res.body === 'object', 'response is not an object');
        assert(res.body.title === newBook.title, 'response has incorrect title');
        assert(res.body.author === newBook.author, 'response has incorrect author');
        assert(res.body.price === newBook.price, 'response has incorrect price');
        done();
      });
  });
});

describe('PUT /books/:id', () => {
  it('updates an existing book when given a valid id', (done) => {
    const updatedBook = { title: 'Updated Book' };
    request(app)
      .put('/books/1') // assuming there is a book with id 1 in the test environment
      .send(updatedBook)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(typeof res.body === 'object', 'response is not an object');
        assert(res.body.id === '1', 'response has incorrect id');
        assert(res.body.title === updatedBook.title, 'response has incorrect title');
        done();
      });
  });

  it('responds with a 404 status when given an invalid id', (done) => {
    const updatedBook = { title: 'Updated Book' };
    request(app)
      .put('/books/invalid-id')
      .send(updatedBook)
      .expect(404, done);
  });
});
