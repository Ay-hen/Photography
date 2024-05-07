import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

import { HomeComponent } from './pages/home/home.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { AddReservationComponent } from './pages/add-reservation/add-reservation.component';
import { SearchComponent } from './pages/search/search.component';
import { CartComponent } from './Components/cart/cart.component';
import { ReservationCartComponent } from './pages/reservation/reservation-cart/reservation-cart.component';
import { SignupComponentPhotographer } from './auth/signup-photography/signup-photographer.component';

export const routes: Routes = [
    {
        path : '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path : 'login', 
        component: LoginComponent
    },
    {
        path : 'signup', 
        component: SignupComponent
    },
    {
        path : 'signup-photographer', 
        component: SignupComponentPhotographer
    },
    {
        path : 'home', 
        component: HomeComponent
    },
    {
        path : 'reservation', 
        component: ReservationComponent
    },
    {
        path : 'add-reservation', 
        component: AddReservationComponent
    },
    {
        path : 'search', 
        component: SearchComponent
    },
    {
        path : "cart-info/:id",
        component: CartComponent
    },
    {
        path : "test",
        component: ReservationCartComponent
    }
];
