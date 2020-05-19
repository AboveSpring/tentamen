const Book = require('../models/book')

getBooks = (req, res, next) => {
  var query;
  if (req.query.Title) {
    query = Book.find({ Title: req.query.Title })
  }
  else {
    query = Book.find()
  }
  query.exec().then((books) => {
    return res.status(200).json(books);
  }).catch((error) => next(error))
}

getBookById = async (req, res, next) => {
  await Book.findOne({ _id: req.params.id }, (err, book) => {
    if (err) {
      return res.status(400).json(err)
    }

    if (!book) {
      return res.status(404)
    }
    return res.status(200).json(book)
  }).catch(error => next(error))
}

createBook = (req, res, next) => {
  const body = req.body
  if (!body) {
    return res.status(400)
  }
  const book = new Book(body)
  book
    .save()
    .then(() => {
      return res.status(201).json(book)
    })
    .catch(error => next(error))
}


updateBook = (req, res, next) => {
  const body = req.body

  Book.updateOne({ _id: req.params.id },
    {
      ISBN: body.ISBN,
      Title: body.Title,
      Author: body.Author,
      Price: body.Price,
      SellerEmail: body.SellerEmail,
      Used: body.Used,
      Location: {
        City: body.Location.City,
        Street: body.Location.Street
      }
    }, {
    new: true,
    upsert: true,
    runvalidators: true,
  }).then((status) => {
    if (status.upserted)
      res.status(201)
    else if (status.nModified)
      res.status(200).json(body)
    else
      res.status(204)
    res.send()
  }).catch(error => next(error))
}

deleteBook = async (req, res, next) => {
  await Book.findOneAndDelete({ _id: req.params.id }, (err, book) => {
    if (err) {
      return res.status(500).json(err)
    }
    if (!book) {
      return res.status(404)
    }
    return res.status(200).json(book)
  }).catch(error => next(error))
}


module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
}