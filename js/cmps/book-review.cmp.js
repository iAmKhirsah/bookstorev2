import { bookService } from '../services/book-service.js';
export default {
  props: ['book'],
  template: `
  <div class="review-container flex">
  <button @click="showReview" class="review-btn">Review</button>
    <form v-if="isReview" :class="toReview" class="form-container flex">
    <input type="text" v-model="review.fname"  placeholder="Enter full name" required>
    <div class="stars">
      <span v-for="num in 5" class="fa fa-star" :class="{checked:num<=review.rating}" @click="changeColor(num)"></span>
    </div>
    <!-- <select v-model.number="review.rating"  name="rating" required>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>
    <div class="star-rating flex">
    <div v-for="(rating) in this.review.rating">
      <i class="fas fa-star"></i>
    </div>
    </div> -->
    <textarea v-model="review.reviewTxt" required></textarea>
    <input type="date" v-model="review.readDate" required/>
    <div class="review-btn-container">
    <button v-if="review" @click.prevent="sendReview" class="review-btn">Save</button>
    <button :class="showMoreReviews" @click="allReviews" class="review-btn">Show Reviews</button>
    </div>
    <div v-for="(review) in book.reviews" :class="reviewList">
        <p>Full name: {{review.fname}}</p>
        <p>Rating: {{review.rating}}</p>
        <p>Review: {{review.reviewTxt}}</p>
        <p>Date: {{review.readDate}}</p>
        <!-- <button @click="removeReview">X</button> -->
    </div>
    </form>
</div>
    `,
  data() {
    return {
      isReview: null,
      isReviewList: false,
      isAllReviews: false,
      review: {
        id: this.createId(3),
        fname: null,
        rating: null,
        reviewTxt: null,
        readDate: null,
      },
    };
  },
  created() {
    if (this.book.reviews) {
      console.log('hello');
      this.isReviewList = true;
      this.review = this.book.reviews;
    }
  },
  methods: {
    sendReview() {
      bookService.addReview(this.book, this.review);
    },
    showReview() {
      return (this.isReview = !this.isReview);
    },
    createId(length = 3) {
      var text = '';
      var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    },
    allReviews() {
      return (this.isAllReviews = !this.isAllReviews);
    },
    // removeReview() {
    //   bookService.removeReview(id);
    // },
    changeColor(num) {
      this.review.rating = num;
    },
  },
  computed: {
    toReview() {
      return this.isReview ? '' : 'hide';
    },
    showMoreReviews() {
      return this.isReviewList ? '' : 'hide';
    },
    reviewList() {
      return this.isAllReviews ? '' : 'hide';
    },
  },
};
