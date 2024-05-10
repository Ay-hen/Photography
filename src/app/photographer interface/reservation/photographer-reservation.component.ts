import { Component } from '@angular/core';
import { NavbarPhotographerComponent } from "../navbar-photographer/navbar-photographer.component";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-photographer-reservation',
    standalone: true,
    templateUrl: './photographer-reservation.component.html',
    styleUrl: './photographer-reservation.component.scss',
    imports: [RouterLink,NavbarPhotographerComponent,CommonModule]
})
export class PhotographerReservationComponent {
    
}
