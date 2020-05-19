const express = require('express')
const router = express.Router()

const book = require('./book.js')

router.get("/books", book.getBooks)
router.get("/books/:id", book.getBookById)
router.post("/books", book.createBook)
router.put("/books/:id", book.updateBook)
router.delete("/books/:id", book.deleteBook)

module.exports = router