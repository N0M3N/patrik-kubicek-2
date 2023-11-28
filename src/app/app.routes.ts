import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AppsComponent } from './pages/apps/apps.component';
import { AboutComponent } from './pages/about/about.component';

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
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'apps',
    component: AppsComponent,
  },
  {
    path: 'apps/gifts-list',
    loadChildren: () => import('./modules/gifts-list/gifts-list.routes').then(m => m.routes),
    data: {
      appMode: true
    }
  },
  {
    path: '*',
    redirectTo: 'home'
  }
];
