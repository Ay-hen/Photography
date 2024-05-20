import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { ReservationCartComponent } from "./reservation-cart/reservation-cart.component";
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-reservation',
    standalone: true,
    templateUrl: './reservation.component.html',
    styleUrl: './reservation.component.scss',
    imports: [NavbarComponent, RouterLink, ReservationCartComponent]
})
export class ReservationComponent implements OnInit{
  reservations :any=[];

  authService = inject(AuthService);
  jwtToken = localStorage.getItem('token');
  httpClient = inject(HttpClient);

  ngOnInit():void{
    const username = this.authService.getUsernameFromToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtToken}`
    });
    
    this.httpClient.get(`http://localhost:8080/user/reservations/${username}`, { headers })
      .subscribe(
        reservations => {
          this.reservations = reservations;
          console.error('Reservations : ', reservations);
        },
        error => {
          this.reservations = [];
        }
      );

  }

  onReservationDeleted(message:string): void {
    alert("Reservation deleted successfully!");
    window.location.reload();
  }

}
