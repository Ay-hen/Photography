import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { CartComponent } from '../../Components/cart/cart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,NavbarComponent,RouterLinkActive,CartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  Behind: string = "../../../assets/behindGrad.jpg";
}
