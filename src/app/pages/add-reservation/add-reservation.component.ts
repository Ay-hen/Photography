import { Component } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-add-reservation',
  standalone: true,
  imports: [NavbarComponent,RouterLink,MatFormFieldModule, MatDatepickerModule],
  templateUrl: './add-reservation.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './add-reservation.component.scss'
})
export class AddReservationComponent {

}
