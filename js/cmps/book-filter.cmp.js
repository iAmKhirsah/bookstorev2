export default {
  template: `
    <div>
        <input @input="filter" v-model="filterBy.title" type="text" placeholder="Search...">
        <input @input="filter" v-model.number="filterBy.from" type="number" placeholder="From...">
        <input @input="filter" v-model.number="filterBy.to" type="number" placeholder="To...">
        <!-- <button @click.prevent="filter()">Search</button> -->
    </div>
    `,
  data() {
    return {
      filterBy: {
        title: '',
        from: '',
        to: 200,
      },
    };
  },
  methods: {
    filter() {
      this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)));
    },
  },
};
