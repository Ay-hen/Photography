import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const role = route.data["role"] as string;

  const authService = inject(AuthService);
  const userRole = authService.getRole(); 
  const routerService = inject(Router);

  if (!authService.isLoggedIn()) {
    routerService.navigate(['/login']);
    return false; 
  }

  if (authService.isLoggedIn()) {
    if (role !== userRole) {
      switch(userRole) {
        case 'client':
          // Handle client case
          routerService.navigate(['/home']);
          break;
        case 'admin':
          // Handle admin case
          routerService.navigate(['/admin/accounts']);
          break;
        case 'photographer':
          // Handle photographer case
          routerService.navigate(['/profile']);
          break;
        default:          
          routerService.navigate(['/unauthorized']);
      }
      return false;
    }

  }


  if(role === userRole) {
    return true; 
  }

  return false; 
};