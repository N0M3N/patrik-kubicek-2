import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { GifteesComponent } from "./pages/giftees/giftees.component";
import { GiftsComponent } from "./pages/gifts/gifts.component";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'giftees',
    component: GifteesComponent
  },
  {
    path: 'gifts',
    component: GiftsComponent
  }
];
