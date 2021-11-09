import { bookService } from '../services/book-service.js';

export default {
  template: `
  <section class="add-book">
        <div class="search-book-container">
        <input v-model.lazy="searchQuery" type="text" placeholder="Search New Book">
        <div v-if="searchResults" v-for="result in searchResults" class="query-and-button">
        <p class="search-query">{{result.title}}</p>
        <button @click="onAddGoogleBook(result.id)">+</button>
        </div>
        </div>
</section>
 `,
  data() {
    return {
      searchQuery: '',
      searchResults: [],
    };
  },
  methods: {
    onAddGoogleBook(id) {
      console.log(id);
      bookService.addGoogleBook(id).then(() => {
        this.$emit('AddedBook');
        this.searchQuery = '';
      });
    },
  },
  watch: {
    searchQuery(newVal, oldVal) {
      if (this.searchResults) this.searchResults = [];
      let results = bookService.googleBooksApi(newVal);
      results.then((result) => {
        result.map((res) => {
          console.log(res.id);
          var id = res.id;
          var title = res.volumeInfo.title;
          if (title.length > 40) {
            title = title.substring(0, 40) + '...';
          }
          var newBook = { id, title };
          this.searchResults.push(newBook);
        });
      });
    },
  },
};
