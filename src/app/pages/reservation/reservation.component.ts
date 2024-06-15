import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { ReservationCartComponent } from "./reservation-cart/reservation-cart.component";
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SearchingComponent } from '../../Components/searching/searching.component';

@Component({
    selector: 'app-reservation',
    standalone: true,
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.scss'], 
    imports: [NavbarComponent,SearchingComponent, RouterLink, ReservationCartComponent]
})
export class ReservationComponent implements OnInit {
  reservations: any = [];
  loading: boolean = true;

  authService = inject(AuthService);
  jwtToken = localStorage.getItem('token');
  httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations(): void {
    const username = this.authService.getUsernameFromToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtToken}`
    });

    this.loading = true; // Start loading
    this.httpClient.get(`http://localhost:8080/user/reservations/${username}`, { headers })
      .subscribe({
        next: (reservations) => {
          this.reservations = reservations;
          console.error('Reservations : ', reservations);
        },
        error: (error) => {
          this.reservations = [];
          console.error('Error fetching reservations: ', error);
        },
        complete: () => this.loading = false // Stop loading
      });
  }

  onReservationDeleted(message: string): void {
    alert("Reservation deleted successfully!");
    this.fetchReservations(); 
  }


  skeletons = [
    {id : 1},
    {id : 2},
    {id : 3},
    {id : 4},
    {id : 5}
  ]
}