import { utilService } from './util-service.js';
import { books } from '../../database/books.js';
import { storageService } from './async-storage-service.js';
const BOOKS_KEY = 'books';
var gBooks = books;
export const bookService = {
  query,
  addReview,
  getById,
  getEmptyReview,
  removeReview,
};

function query() {
  var books = JSON.parse(localStorage.getItem(BOOKS_KEY)) || [];
  return Promise.resolve(books);
}

function removeReview(id) {
  console.log(id);
  // const idx = entities.findIndex((entity) => entity.id === entityId);
  // entities.splice(idx, 1);
  // _save(entityType, entities);
}

_createBooks();
function _createBooks() {
  let books = utilService.loadFromStorage(BOOKS_KEY);
  if (!books || !books.length) {
    utilService.saveToStorage(BOOKS_KEY, gBooks);
  }
  return books;
}
function addReview(book, review) {
  if (!book['reviews']) {
    book['reviews'] = [];
  }
  book.reviews.push(review);
  storageService.put(BOOKS_KEY, book);
}
function getById(bookId) {
  return storageService.get(BOOKS_KEY, bookId);
}

function getEmptyReview() {
  return {
    fname: null,
    rating: null,
    reviewTxt: null,
    readDate: null,
  };
}
