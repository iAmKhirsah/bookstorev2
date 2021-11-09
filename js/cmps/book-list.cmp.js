import bookPreview from './book-preview.cmp.js';

export default {
  props: ['books'],
  components: {
    bookPreview,
  },
  template: `
   <ul class="book-list">
    <li v-for="book in books" :key="book.id" class="book-preview-container">
        <router-link :to="'/book/details/'+book.id">
          <book-preview :book="book"/>
        </router-link>
    </li>
   </ul>
  `,
  methods: {},
};
