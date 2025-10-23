const express = require('express');   // 1️⃣ Import Express
const app = express();                // 2️⃣ Create an Express app
const PORT = 3000;                    // 3️⃣ Choose the port number

let books = [
  { id: 1, title: "Harry Potter", author: "J.K. Rowling" },
  { id: 2, title: "The Hobbit", author: "J.R.R. Tolkien" }
];


app.use(express.json());              // 4️⃣ Allow reading JSON in requests

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  };

  books.push(newBook);
  res.json(newBook);
});


app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.send("Book not found");
  }

  book.title = req.body.title;
  book.author = req.body.author;

  res.json(book);
});


app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);

  if (index === -1) {
    return res.send("Book not found");
  }

  const deletedBook = books.splice(index, 1);
  res.json(deletedBook);
});


app.listen(PORT, () => {              // 5️⃣ Start the server
  console.log(`Server running on http://localhost:${PORT}`);
});
