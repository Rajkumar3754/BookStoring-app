const asyncHandler = require('express-async-handler');
const Book = require('../models/booksModel');

//@desc Get all books
//@routes GET /api/books/
//@access Public
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

//@desc Get a single book by ID
//@routes GET /api/books/:id
//@access Public
const getBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

//@desc Create a new book
//@routes POST /api/books/
//@access Public
const postBooks = asyncHandler(async (req, res) => {
  const { title, author, publishYear } = req.body;
  const book = new Book({
    title,
    author,
    publishYear
  });
  const createdBook = await book.save();
  res.status(201).json(createdBook);
});

//@desc Update a book by ID
//@routes PUT /api/books/:id
//@access Public
const updateBook = asyncHandler(async (req, res) => {
  const { title, author, publishYear } = req.body;
  const book = await Book.findById(req.params.id);
  if (book) {
    book.title = title;
    book.author = author;
    book.publishYear = publishYear;
    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

//@desc Delete a book by ID
//@routes DELETE /api/books/:id
//@access Public
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    await book.deleteOne();
    res.json({ message: 'Book removed' });
  } else {
    res.status(404);
    throw new Error('Book not found');
  }
});

module.exports = { getBooks, getBook, postBooks, updateBook, deleteBook };
