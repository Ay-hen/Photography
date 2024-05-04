import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

import { HomeComponent } from './pages/home/home.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { AddReservationComponent } from './pages/add-reservation/add-reservation.component';
import { SearchComponent } from './pages/search/search.component';
import { CartComponent } from './Components/cart/cart.component';
import { ReservationCartComponent } from './pages/reservation/reservation-cart/reservation-cart.component';

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
