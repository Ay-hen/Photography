import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Cart } from './cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'] // Corrected typo here from 'styleUrl' to 'styleUrls'
})
export class CartComponent implements OnInit {
  @Input() cart: Cart = {
    id: 1,
    title: 'Marriage',
    image: '../../../assets/wedding.jpg',
    description: 'This is the cart page'
  }; 

  isLoading: boolean = true; 

  constructor(private router: Router, private route: ActivatedRoute) {
    
    setTimeout(() => {
      this.isLoading = false; 
    }, 2000); 
  }

  seeMore() {
    this.router.navigate(['/add-reservation']);
  }

  ngOnInit() {
    
    const id = this.route.snapshot.paramMap.get('id');
    
  }
}