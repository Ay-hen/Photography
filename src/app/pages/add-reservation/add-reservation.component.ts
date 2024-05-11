import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { RouterLink } from '@angular/router';


import { User } from '../../app.component.models';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-reservation',
  standalone: true,
  imports: [NavbarComponent,RouterLink,ReactiveFormsModule,HttpClientModule],
  templateUrl: './add-reservation.component.html',
  providers: [],
  styleUrl: './add-reservation.component.scss'
})
export class AddReservationComponent {
  photographers !:User[]; 

  httpClient = inject(HttpClient);
  data =[];



  userForm : FormGroup = new FormGroup({
    name : new FormControl("",[Validators.required]),
    phone : new FormControl("",[Validators.required]),
    city : new FormControl("",[Validators.required]),
    hour : new FormControl("",[Validators.required]),
    date : new FormControl("",[Validators.required]),
    type : new FormControl("",[Validators.required]),
    photographer : new FormControl("",[Validators.required])
  });;


  

  onSubmit() {
    
  }


  onBlurMethod(event: Event) {
    const city = (event.target as HTMLInputElement).value;

    this.httpClient.get<User[]>(`http://localhost:8080/user/city/${city}`)
    .subscribe(photographers => {
      this.photographers = photographers;
      console.log('Photographers:', this.photographers);
    },
    error => {
      console.error('Error fetching photographers:', error);
      this.photographers = [];
    });
  }

}
