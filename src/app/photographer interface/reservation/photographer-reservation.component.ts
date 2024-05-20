import { Component, OnInit, inject } from '@angular/core';
import { NavbarPhotographerComponent } from "../navbar-photographer/navbar-photographer.component";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-photographer-reservation',
    standalone: true,
    templateUrl: './photographer-reservation.component.html',
    styleUrl: './photographer-reservation.component.scss',
    imports: [RouterLink,NavbarPhotographerComponent,CommonModule]
})
export class PhotographerReservationComponent implements OnInit{
    reservations : any = [];
    http = inject(HttpClient);
    authService = inject(AuthService);

    jwtToken = localStorage.getItem('token');

    
    ngOnInit():void{
        const username = this.authService.getUsernameFromToken();
    
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.jwtToken}`
        });
        
        this.http.get(`http://localhost:8080/user/reservations/${username}`, { headers })
            .subscribe(
            reservations => {
                this.reservations = reservations;
                console.log('Reservations : ', reservations);
            }
        );
    
    }

    accept(id : string){
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.jwtToken}`
        });

        const formData = new FormData();
        formData.append('status', 'Accepted');
        formData.append('id', id);

        this.http.post(`http://localhost:8080/user/status`,formData, { headers })
            .subscribe(
            reservations => {
                this.reservations = reservations;
                console.log('Reservations : ', reservations);
                alert("You have accepted the reservation!");
                window.location.reload();
            },
            error => {
                this.reservations = [];
            }
        );
    }


    rejected(id : string){
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.jwtToken}`
        });

        const formData = new FormData();
        formData.append('status', 'Rejected');
        formData.append('id', id);

        this.http.post(`http://localhost:8080/user/status`, formData,{ headers })
            .subscribe(
            reservations => {
                this.reservations = reservations;
                console.log('Reservations : ', reservations);
                alert("You have rejected the reservation!");
                window.location.reload();
            }
        );
    }

}
