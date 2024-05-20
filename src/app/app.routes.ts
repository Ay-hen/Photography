import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

import { HomeComponent } from './pages/home/home.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { AddReservationComponent } from './pages/add-reservation/add-reservation.component';
import { SearchComponent } from './pages/search/search.component';
import { CartComponent } from './Components/cart/cart.component';
import { SignupComponentPhotographer } from './auth/signup-photography/signup-photographer.component';
import { PhotographerDashboardComponent } from './photographer interface/profile/photographer-dashboard.component';
import { PhotographerReservationComponent } from './photographer interface/reservation/photographer-reservation.component';
import { AdminReservationComponent } from './admin interface/admin-reservation/admin-reservation.component';
import { AdminAccountsComponent } from './admin interface/admin-accounts/admin-accounts.component';
import { authGuard } from './guard/auth.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

export const routes: Routes = [

    {
        path : '',
        redirectTo : '/login',
        pathMatch : 'full'
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
        component: HomeComponent,
        canActivate : [authGuard],
        data: { role: 'client' }
    },
    {
        path : 'reservation', 
        component: ReservationComponent,
        canActivate : [authGuard],
        data: { role: 'client' }
    },
    {
        path : 'add-reservation', 
        component: AddReservationComponent,
        canActivate : [authGuard],
        data: { role: 'client' }
    },
    {
        path : 'search', 
        component: SearchComponent,
        canActivate : [authGuard],
        data: { role: 'client' }
    },
    {
        path : "cart-info/:id",
        component: CartComponent,
        canActivate : [authGuard],
        data: { role: 'client' }
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    },
    {
        path : "profile",
        component: PhotographerDashboardComponent,
        canActivate : [authGuard],
        data: { role: 'photographer' }
    },
    {
        path : "reservation-photographer",
        component: PhotographerReservationComponent,
        canActivate : [authGuard],
        data: { role: 'photographer' }
    },
    {
        path : "admin/reservations",
        component : AdminReservationComponent,
        canActivate : [authGuard],
        data: { role: 'admin' }
    }
    ,{
        path : "admin/accounts",
        component : AdminAccountsComponent,
        canActivate : [authGuard],
        data: { role: 'admin' }
    }
];