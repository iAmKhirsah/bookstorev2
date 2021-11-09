export default {
  template: `
    <section class="home-page">
       <h1 class="title"> Welcome to the magical bookstore </h1>
       <nav class="home-page-nav flex">
                <router-link to="/"> Home </router-link>
                <router-link to="/book"> Books </router-link>
                <router-link to="/about"> About </router-link>
        </nav>
    </section>
    `,
};
