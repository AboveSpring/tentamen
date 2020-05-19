// Mongoose and mocking requests
const sinon = require('sinon');

const mongoose = require('mongoose')
mongoose.set('debug', true)
require('sinon-mongoose')

// initialize the app and models
const app = require('../../index.js')

// sending requests
const agent = require('supertest').agent(app);
// validating results
const expect = require('chai').expect;

// get the model
const Book = mongoose.model('Book')

var mock = sinon.mock(Book)

beforeEach(() => {
	mock.restore(); // Unwraps the spy
	mock = sinon.mock(Book)
});

afterEach(() => {
	mock.verify();
});

const request = {


	"Location": {
		"City": "Redmond",
		"Street": "156TH AVE NE"
	},
	"ISBN": "978-0-321-87758-1",
	"Title": "ringz",
	"Author": "Mark Michaelis",
	"Price": 59.99,
	"SellerEmail": "someone@someplace.com",
	"Used": false,
	


}

const expected = {

	"Location": {
		"City": "Redmond",
		"Street": "156TH AVE NE"
	},
	"_id": "5ec391480c552a3554ab49ba",
	"ISBN": "978-0-321-87758-1",
	"Title": "ringz",
	"Author": "Mark Michaelis",
	"Price": 59.99,
	"SellerEmail": "someone@someplace.com",
	"Used": false,
	"__v": 0
}

describe('books.get', () => {

	it('Should return an array of all books', (done) => {

		// Given (preconditions)
		mock
			.expects('find')
			.chain('exec')
			.resolves([expected]);

		// When (someting happens)
		agent
			.get('/books')
			.end((err, res) => {
				// Then (something should happen)
				expect(res.status).to.equal(200);
				expect(res.body).to.eql([expected]);
				done();
			});
	});



	// it('Should get a book by title', (done) => {

	// 	// Given (preconditions)
	// 	mock
	// 		.expects('findOne')
	// 		.withArgs({ "Title": "ring" })
	// 		.chain('exec')
	// 		.resolves(expected);

	// 	// When (someting happens)
	// 	agent
	// 		.get('/books/?Title=ring')
	// 		.end((err, res) => {
	// 			// Then (something should happen)
	// 			expect(res.status).to.equal(200);
	// 			expect(res.body).to.eql(expected);
	// 			done();
	// 		});
	// });


	// describe('student.post', () => {
	// 	it('Should be able to create a book', (done) => {
	// 		// Given (preconditions)
	// 		mock
	// 			.expects('create')
	// 			.withArgs(request)
	// 			.chain('exec')
	// 			.resolves(expected);

	// 		// When (someting happens)
	// 		agent
	// 			.post('/books')
	// 			.send(request)
	// 			.end((err, res) => {
	// 				// Then (something should happen)
	// 				expect(res.status).to.equal(201);
	// 				expect(res.body).to.eql(expected);
	// 				done();
	// 			});
	// 	});
	// })

	// describe('book.delete', ()  => { 
	// 	it('Should be able to delete a book', (done) => {
	// 		// Given (preconditions)
	// 		mock
	// 		.expects('findByIdAndDelete')
	// 		.withArgs('5ec391480c552a3554ab49ba')
	// 		.chain('exec')
	// 		.resolves('200')

	// 		// When (someting happens)
	// 		agent
	// 		.delete('/books/5ec391480c552a3554ab49ba')
	// 		.send()
	// 		.end((err,res) => {
	// 		// Then (something should happen)
	// 			expect(res.status).to.equal(200);
	// 			done();
	// 		});
	// 	});
	// });
});



