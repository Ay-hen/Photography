import { Component, inject } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar-photographer',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar-photographer.component.html',
  styleUrl: './navbar-photographer.component.scss'
})
export class NavbarPhotographerComponent {

  authService = inject(AuthService);

  logout(){
    const username = this.authService.getUsernameFromToken();
    this.authService.logout(username);
  }
}
