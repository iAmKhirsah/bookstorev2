import { utilService } from './util-service.js';
import { books } from '../../database/books.js';
import { storageService } from './async-storage-service.js';
const BOOKS_KEY = 'books';
var gBooks = books;
const API_KEY = 'AIzaSyAQ_OtORbNSx-qcNp0UH-WlQf22Ht_P4Mg';
export const bookService = {
  query,
  addReview,
  getById,
  getEmptyReview,
  removeReview,
  googleBooksApi,
  addGoogleBook,
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
function addGoogleBook(id) {
  console.log(id);
  return axios(
    `https://www.googleapis.com/books/v1/volumes/${id}?${API_KEY}`
  ).then((book) => {
    let bookie = bookShell(id, book.data.volumeInfo, book.data.saleInfo);
    storageService.post(BOOKS_KEY, bookie);
  });
}

function googleBooksApi(search) {
  return axios(
    `https://www.googleapis.com/books/v1/volumes?printType=books&q=${search}&${API_KEY}`
  ).then((books) => {
    let book = books.data.items;
    return book.map((data) => {
      return data;
    });
  });
}

function bookShell(
  id,
  {
    title,
    subtitle,
    authors,
    publishedDate,
    description,
    printedPageCount,
    categories,
    imageLinks,
    language,
  },
  listPrice
) {
  return {
    id,
    title,
    subtitle,
    authors,
    publishedDate: new Date(publishedDate).getFullYear(),
    description,
    pageCount: printedPageCount,
    categories,
    thumbnail: imageLinks.thumbnail,
    language,
    listPrice: {
      amount: Date.now() % 1000,
      currencyCode: 'EUR',
      isOnSale: listPrice.saleability === 'NOT_FOR_SALE' ? false : true,
    },
  };
}
