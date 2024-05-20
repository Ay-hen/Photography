import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './admin-reservation.component.html',
  styleUrl: './admin-reservation.component.scss'
})
export class AdminReservationComponent implements OnInit {
  reservations : any = [];

  http = inject(HttpClient);
  authService = inject( AuthService );

  jwtToken = localStorage.getItem('jwtToken');

  ngOnInit():void{

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtToken}`
    });
    
    this.http.get(`http://localhost:8080/user/reservations/all`, { headers })
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
}
