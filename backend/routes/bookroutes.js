const express = require('express');
const router = express.Router();

const {getBooks,getBook,postBooks,deleteBook,updateBook} = require('../controller/bookcontroller')

// GET all items
router.get('/',getBooks );

// POST a new item
router.post('/', postBooks);

// GET a specific item by ID
router.get('/:id', getBook);

// PUT (update) a specific item by ID
router.put('/:id', updateBook);

// DELETE a specific item by ID
router.delete('/:id', deleteBook);

module.exports = router;
