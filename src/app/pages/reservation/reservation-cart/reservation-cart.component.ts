import { Component, Input } from '@angular/core';
import { Reservation } from '../../../app.component.models';
//import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reservation-cart',
  standalone: true,
  imports: [],
  templateUrl: './reservation-cart.component.html',
  styleUrl: './reservation-cart.component.scss'
})
export class ReservationCartComponent {
  @Input() reservation !:Reservation;

  //constructor(private http: HttpClient) { }

  /*delete() {
    this.http.delete(`api/reservations/${this.reservation.id}`).subscribe(() => {
      console.log('Reservation deleted');
    });
  }*/

  delete(){

  }
}
