import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { CartComponent } from '../../Components/cart/cart.component';
import { Cart} from "../../app.component.models"

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,NavbarComponent,RouterLinkActive,CartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  Behind: string = "../../../assets/behindGrad.jpg";

  carts: Cart[] = [
    {
      id: 1,
      title: 'Marriage',
      image: '../../../assets/wedding.jpg',
      description: 'Price : 80DH/hour'
    },
    {
      id: 2,
      title: 'Montage',
      image: '../../../assets/jakob-owens-l82NzBSYbj0-unsplash.jpg',
      description: 'Price : 50DH/hour'
    },
    {
      id: 3,
      title: 'Party',
      image: '../../../assets/eric-nopanen-3skLpaOBlMw-unsplash.jpg',
      description: 'Price : 40DH/hour'
    },
    {
      id: 4,
      title: 'Birthday',
      image: '../../../assets/birthday.jpg',
      description: 'Price : 60DH/hour'
    }
  ];
}
