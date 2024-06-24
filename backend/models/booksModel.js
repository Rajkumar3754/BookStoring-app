const mongoose = require('mongoose');

// Define the schema for a book
const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        publishYear: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true // Automatically add `createdAt` and `updatedAt` fields
    }
);

// Create a model from the schema
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
