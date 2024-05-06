import { Component } from '@angular/core';
import { Router, RouterLink ,ActivatedRoute} from '@angular/router';
import { Cart } from './cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  

  cart : Cart;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.cart = {
      id:1,
      title : 'Marriage',
      image : '../../../assets/wedding.jpg',
      description : 'This is the cart page'
    }
  }

  seeMore(id: number) {
    this.router.navigate(['/cart-info', id]);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id); // logs the id parameter from the route
  }
}


