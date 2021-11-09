// import { storageService } from '../services/async-storage-service.js';
import bookDesc from '../cmps/book-description.cmp.js';
import bookReview from '../cmps/book-review.cmp.js';
import { bookService } from '../services/book-service.js';

export default {
  components: {
    bookDesc,
    bookReview,
  },
  template: `
    <section v-if="book" class="book-details" >
        <h3>{{book.title}}</h3>
        <img :src="book.thumbnail" />
        <div class="book-details-content">
        <p>{{book.title}} By {{authorsForDisplay}}</p>
        <p>Subtitle: {{book.subtitle}}</p>
        <p>Categories: {{categoriesForDisplay}}</p>
        <p>Price: {{currencyForDisplay}} <span :class="isExpensive">{{book.listPrice.amount}} {{isOnSale}}</span></p>
        <book-review :book="book"/>
        <p>Language: {{book.language}}</p>
        <p>Published: {{publishedDateForDisplay}}</p>
        <p>Book length: {{book.pageCount}}, {{pageCountForDisplay}}</p>
        <book-desc :txt="book.description"/>
      </div>
      <router-link to="/book">
      <button class="close-details">Back</button>
      </router-link>
    </section>
    `,
  data() {
    return {
      book: null,
    };
  },
  created() {
    const { bookId } = this.$route.params;
    bookService.getById(bookId).then((book) => (this.book = book));
  },
  computed: {
    isOnSale() {
      return this.book.listPrice.isOnSale ? 'On Sale!' : '';
    },
    isExpensive() {
      return this.book.listPrice.amount > 150 ? 'red' : 'green';
    },
    currencyForDisplay() {
      let currency = this.book.listPrice.currencyCode;
      if (currency === 'EUR') return '€';
      else if (currency === 'ILS') return '₪';
      else if (currency === 'USD') return '$';
    },
    authorsForDisplay() {
      const bookAuthors = [...this.book.authors]
        .toString()
        .split(',')
        .join(' | ');
      return bookAuthors;
    },
    categoriesForDisplay() {
      const bookCategories = [...this.book.categories]
        .toString()
        .split(',')
        .join(' | ');
      return bookCategories;
    },
    pageCountForDisplay() {
      const read = this.book.pageCount;
      if (read > 500) return 'Long Reading';
      else if (read > 200 && read < 500) return 'Decent Reading';
      else if (read < 100) return 'Short Read';
    },
    publishedDateForDisplay() {
      const date = this.book.publishedDate;
      let currDate = new Date();
      if (currDate.getFullYear() - date >= 10) return 'Veteran book';
      else if (currDate.getFullYear() - date <= 1) return 'New Book!';
    },
  },
};
