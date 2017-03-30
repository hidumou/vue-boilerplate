import App from '../App';
import Home from '../pages/Home.vue';

export default [
  {
    path: '/',
    component: App,
    children:[
      { path: '/home', name:'home', component: Home},
    ]
  }
];
