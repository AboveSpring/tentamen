mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({ 
    ISBN: String,
    Title: String,
    Author: String,
    Price: Number,
    SellerEmail: String,
    Used: Boolean,
    Location: {
        City: String,
        Street: String
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;