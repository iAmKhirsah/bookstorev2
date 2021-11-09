import bookApp from './pages/book-app.cmp.js';
import appHeader from './cmps/app-header.cmp.js';
import appFooter from './cmps/app-footer.cmp.js';
import { router } from './routes.js';
const options = {
  el: '#app',
  router,
  components: {
    bookApp,
    appHeader,
    appFooter,
  },
  template: `<section class="main-container flex">
                <app-header />
                <router-view />
                <app-footer id="footer" />
             </section>
            `,
};

new Vue(options);
