import { Component } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import {provideNativeDateAdapter} from '@angular/material/core';

import { User } from '../../app.component.models';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-reservation',
  standalone: true,
  imports: [NavbarComponent,RouterLink,ReactiveFormsModule],
  templateUrl: './add-reservation.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './add-reservation.component.scss'
})
export class AddReservationComponent {
  photographers !:User[]; 

  userForm : FormGroup;

  constructor(){
    this.userForm = new FormGroup({
      name : new FormControl("",[Validators.required]),
      phone : new FormControl("",[Validators.required]),
      city : new FormControl("",[Validators.required]),
      hour : new FormControl("",[Validators.required]),
      date : new FormControl("",[Validators.required]),
      type : new FormControl("",[Validators.required]),
      photographer : new FormControl("",[Validators.required])
    });
  }

  onSubmit() {
    
  }
}
