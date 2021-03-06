import homePage from './pages/home-page.cmp.js';
import aboutPage from './pages/about-page.cmp.js';
import bookApp from './pages/book-app.cmp.js';
import bookDetails from './pages/book-details.cmp.js';

const routes = [
  {
    path: '/',
    component: homePage,
  },
  {
    path: '/about',
    component: aboutPage,
  },
  {
    path: '/book',
    component: bookApp,
  },
  {
    path: '/book/details/:bookId/review',
    component: bookDetails,
  },
  {
    path: '/book/details/:bookId',
    component: bookDetails,
  },
];

export const router = new VueRouter({ routes });
