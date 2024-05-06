import { Component } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { Reservation } from '../../app.component.models';
import { ReservationCartComponent } from "./reservation-cart/reservation-cart.component";

@Component({
    selector: 'app-reservation',
    standalone: true,
    templateUrl: './reservation.component.html',
    styleUrl: './reservation.component.scss',
    imports: [NavbarComponent, RouterLink, ReservationCartComponent]
})
export class ReservationComponent {
  reservations :Reservation[]=[
    {
      id:1,
      username : 'John Doe',
      date : '05/05/2024',
      status : 'Pending',
      type : 'Marriage'
    },
    {
      id:2,
      username : 'Kaizo',
      date : '06/05/2024',
      status : 'Accepted',
      type : 'Montage'
    },
    
    {
      id:4,
      username : 'Kabjbizo',
      date : '06/05/2024',
      status : 'Accepted',
      type : 'Montaghhe'
    },
    {
      id:6,
      username : 'Kabjbizo',
      date : '06/05/2024',
      status : 'Accepted',
      type : 'Montaghhe'
    },
    {
      id:3,
      username : 'Ayoub',
      date : '04/05/2024',
      status : 'Rejected',
      type : 'Party'
    }
  ];

}
