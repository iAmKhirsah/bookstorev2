import { bookService } from '../services/book-service.js';
import bookList from '../cmps/book-list.cmp.js';
import bookFilter from '../cmps/book-filter.cmp.js';
import bookDetails from './book-details.cmp.js';
export default {
  components: {
    bookList,
    bookFilter,
    bookDetails,
  },
  template: `
    <section class="book-app flex ">
       <book-filter class="book-filter" @filtered="setFilter"/>
       <book-list :books="booksToShow"/>
    </section>
`,
  data() {
    return {
      books: null,
      selectedBook: null,
      filterBy: null,
    };
  },
  created() {
    this.loadBooks();
  },
  methods: {
    loadBooks() {
      bookService.query().then((books) => (this.books = books));
    },
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
    selectBook(book) {
      this.selectedBook = book;
    },
    closeBook() {
      this.selectedBook = null;
    },
  },
  computed: {
    booksToShow() {
      if (!this.filterBy) return this.books;
      const from = this.filterBy.from;
      const to = this.filterBy.to;
      const searchStr = this.filterBy.title.toLowerCase();
      const booksToShow = this.books.filter((book) => {
        const price = book.listPrice.amount;
        return (
          book.title.toLowerCase().includes(searchStr) &&
          from < price &&
          to >= price
        );
      });
      return booksToShow;
    },
  },
};
