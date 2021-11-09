export default {
  props: ['txt'],
  template: `
  <section>
      <p>Description: {{tooLongDidntRead()}}</p>
      <button class="tldr-btn" :class="isTldr" @click="fullDesc">Read More</button>
  </section>
    `,
  data() {
    return {
      tldr: false,
      fullTldr: false,
    };
  },
  methods: {
    tooLongDidntRead() {
      const text = this.txt;
      if (this.fullTldr) return text;
      if (text.length > 100) {
        this.tldr = true;
      }
      return text.slice(0, 100);
    },
    fullDesc() {
      return (this.fullTldr = !this.fullTldr);
    },
  },
  computed: {
    isTldr() {
      return this.tldr ? '' : 'hide';
    },
  },
};
