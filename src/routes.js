import About from './pages/About';
import Profile from './pages/About/Profile';
import SocialMedia from './pages/About/SocialMedia';
import Contact from './pages/Contact';
import Home from './pages/Home';
import TodoApp from './pages/Todo';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    title: 'Home',
  },
  {
    path: '/about',
    component: About,
    title: 'About',
    authRequired: true,
    routes: [
      {
        path: '/about/profile',
        component: Profile,
        title: 'Profile',
      },
      {
        path: '/about/socialMedia',
        component: SocialMedia,
        title: 'Social Media',
      },
    ],
  },
  {
    path: '/contact',
    component: Contact,
    title: 'Contact',
  },
  {
    path: '/todo',
    component: TodoApp,
    title: 'Todo',
  },
];

export default routes;
