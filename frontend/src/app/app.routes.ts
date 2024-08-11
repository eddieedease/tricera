import { Route } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { Error404Component } from './error404/error404.component';
import { ManageComponent } from './manage/manage.component';

export const appRoutes: Route[] = [
  { path: '', component: LandingComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: '404', component: Error404Component },
  { path: 'manage', component: ManageComponent },
  // { path: 'product/:id', component: ProductDetailComponent }
];