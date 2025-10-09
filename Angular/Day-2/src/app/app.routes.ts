import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { ProductsComponent } from './products/products';

export const routes: Routes = [
  { path: '*', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'register',
    component: Login,
    title: 'Register',
  },
  {
    path: 'login',
    component: Login,
    title: 'Login',
  },
  {
    path: 'home',
    component: Home,
    title: 'Home',
  },
  {
    path: 'products',
    component: ProductsComponent,
    title: 'Products',
  },
];
