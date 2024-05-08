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
    itemsPerPage = 6; // Set the number of items per page
    totalItems!: number; // This should be the total number of carts
    totalPages!: number; // This will hold the total number of pages
currentPage: any;

    ngOnInit() {
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    }

    goToPage(page: number) {
        if (page < 1 || page > this.totalPages) {
            throw new Error('Invalid page number');
        }
        this.currentPage = page;
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }
}
