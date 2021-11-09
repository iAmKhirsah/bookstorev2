export default {
  props: ['book'],
  template: `
        <div class="book-preview">
            <img :src="book.thumbnail" width="120px" height="160px"/>
            <p>Title : {{book.title}}</p>
            <p class="book-preview-price">Price : {{book.listPrice.amount}} {{currency}}</p>
        </div>
    `,
  computed: {
    currency() {
      let currency = this.book.listPrice.currencyCode;
      if (currency === 'EUR') return '€';
      else if (currency === 'ILS') return '₪';
      else if (currency === 'USD') return '$';
    },
  },
};
