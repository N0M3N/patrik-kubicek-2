import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AppsComponent } from './pages/apps/apps.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'apps',
    component: AppsComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
