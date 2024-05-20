import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reservation-cart',
  standalone: true,
  imports: [],
  templateUrl: './reservation-cart.component.html',
  styleUrl: './reservation-cart.component.scss'
})
export class ReservationCartComponent {
  @Input() reservation !:any;
  @Output() reservationDeleted = new EventEmitter<string>();

  http = inject(HttpClient);
  
  jwtToken = localStorage.getItem('token');

  delete(id : string){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtToken}`
    });
    this.http.delete(`http://localhost:8080/user/delete/reservation/${id}`, {headers}).subscribe(
      () => {
        this.reservationDeleted.emit("deleted");
      },
      error => {
        console.error('Error deleting reservation:', error);
        // Handle the error here
      }
    );
  }
}
