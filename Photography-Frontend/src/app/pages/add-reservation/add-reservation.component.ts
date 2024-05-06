import { Component } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-reservation',
  standalone: true,
  imports: [NavbarComponent,RouterLink],
  templateUrl: './add-reservation.component.html',
  styleUrl: './add-reservation.component.scss'
})
export class AddReservationComponent {

}
