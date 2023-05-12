const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.NODE_ENV === 'test' ? 4000 : 3000; // Use port 4000 for test environment, and 3000 for all other environments

app.use(bodyParser.json());

let books = [];

fs.readFile('books.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    books = JSON.parse(data);
  }
});

function saveBooks() {
  fs.writeFile('books.json', JSON.stringify(books), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const book = books.find((b) => b.id === req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.sendStatus(404);
  }
});

app.post('/books', (req, res) => {
  const book = req.body;
  book.addedDate = new Date().toISOString();
  books.push(book);
  saveBooks();
  res.json(book);
});

app.put('/books/:id', (req, res) => {
  const bookIndex = books.findIndex((b) => b.id === req.params.id);
  if (bookIndex === -1) {
    res.sendStatus(404);
  } else {
    const updatedBook = { ...books[bookIndex], ...req.body };
    updatedBook.id = req.params.id;
    books[bookIndex] = updatedBook;
    saveBooks();
    res.json(updatedBook);
  }
});

app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex((b) => b.id === req.params.id);
  if (bookIndex === -1) {
    res.sendStatus(404);
  } else {
    const deletedBook = books.splice(bookIndex, 1)[0];
    saveBooks();
    res.json(deletedBook);
  }
});

app.get('/statistics', (req, res) => {
  const stats = {
    count: books.length,
    averagePrice: books.reduce((total, b) => total + b.price, 0) / books.length,
    authors: [...new Set(books.map((b) => b.author))],
  };
  res.json(stats);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
