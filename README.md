Book Store

This is a Node.js project for a book store API with CRUD operations and statistics.
Installation

    Clone the repository:

git clone (https://github.com/ahbilalkhan-10p/book-store.git)

Install dependencies:

    cd book-store
    npm install

Usage

To start the server, run the following command:

npm start

The server will start listening on http://localhost:3000.

To run the tests, run the following command:

npm test

API
GET /books

Retrieves a list of all books in the store.
GET /books/:id

Retrieves a specific book by its ID.
POST /books

Adds a new book to the store.
                   
Request Body:

{
  "title": "string",
  "price": "number",
  "description": "string",
  "author": "string",
  "publishedDate": "string"
}

PUT /books/:id

Updates an existing book by its ID.

Request body:

json

{
  "title": "string",
  "price": "number",
  "description": "string",
  "author": "string",
  "publishedDate": "string"
}

DELETE /books/:id

Deletes a book by its ID.
GET /statistics

Retrieves statistics about the book store.

Response body:

json

{
  "count": "number",
  "averagePrice": "number",
  "authors": ["string"]
}

Data format

Book data is stored in a JSON file (data/books.json) with the following format:

json

{
  "id": "string",
  "title": "string",
  "price": "number",
  "description": "string",
  "author": "string",
  "publishedDate": "string",
  "addedDate": "string"
}

