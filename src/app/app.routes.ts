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
        path : "profile",
        component: PhotographerDashboardComponent
    },
    {
        path : "reservation-photographer",
        component: PhotographerReservationComponent
    },
    {
        path : "admin/reservations",
        component : AdminReservationComponent
    }
    ,{
        path : "admin/accounts",
        component : AdminAccountsComponent
    }
];

/* export const routes: Routes = [
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
        component: HomeComponent,
        canActivate: [RoleGuard],
        data: { role: 'client' }
    },
    {
        path : 'cart-info/:id', 
        component: HomeComponent,
        canActivate: [RoleGuard],
        data: { role: 'client' }
    },
    {
        path : 'reservation', 
        component: HomeComponent,
        canActivate: [RoleGuard],
        data: { role: 'client' }
    },
    {
        path : 'add-reservation', 
        component: HomeComponent,
        canActivate: [RoleGuard],
        data: { role: 'client' }
    },
    {
        path : 'search', 
        component: HomeComponent,
        canActivate: [RoleGuard],
        data: { role: 'client' }
    },
    
    {
        path : "admin/reservations",
        component : AdminReservationComponent,
        canActivate: [RoleGuard],
        data: { role: 'admin' }
    },
    {
        path : "admin/accounts",
        component : AdminAccountsComponent,
        canActivate: [RoleGuard],
        data: { role: 'admin' }
    },
    {
        path : "profile",
        component: PhotographerDashboardComponent,
        canActivate: [RoleGuard],
        data: { role: 'photographer' }
    },
    {
        path : "reservation-photographer",
        component: PhotographerReservationComponent,
        canActivate: [RoleGuard],
        data: { role: 'photographer' }
    }
    
]; */