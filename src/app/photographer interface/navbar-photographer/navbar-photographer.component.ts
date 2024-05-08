import { Component } from '@angular/core';
import { RouterLink,RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar-photographer',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar-photographer.component.html',
  styleUrl: './navbar-photographer.component.scss'
})
export class NavbarPhotographerComponent {

  logout(){}
}
