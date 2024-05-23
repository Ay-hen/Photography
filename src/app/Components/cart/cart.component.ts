import { Component, Input } from '@angular/core';
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

  @Input() cart : Cart;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.cart = {
      id:1,
      title : 'Marriage',
      image : '../../../assets/wedding.jpg',
      description : 'This is the cart page'
    }
  }

  seeMore() {
    this.router.navigate(['/add-reservation']);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
  }
}


