import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './admin-reservation.component.html',
  styleUrl: './admin-reservation.component.scss'
})
export class AdminReservationComponent {
  onAccept(){

  }
  onReject(){
    
  }
}
