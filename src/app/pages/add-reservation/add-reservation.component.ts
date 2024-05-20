import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { RouterLink } from '@angular/router';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-reservation',
  standalone: true,
  imports: [NavbarComponent,RouterLink,ReactiveFormsModule,HttpClientModule],
  templateUrl: './add-reservation.component.html',
  providers: [],
  styleUrl: './add-reservation.component.scss'
})
export class AddReservationComponent  {
  photographers !:any; 

  jwtToken = localStorage.getItem('token');

  httpClient = inject(HttpClient);
  authService = inject(AuthService);
  data =[];


  userForm : FormGroup = new FormGroup({
    name : new FormControl("",[Validators.required]),
    phone : new FormControl("",[Validators.required]),
    city : new FormControl("",[Validators.required]),
    date : new FormControl("",[Validators.required]),
    type : new FormControl("",[Validators.required]),
    photographer : new FormControl("",[Validators.required])
  });;



  onSubmit() {
    const username = this.authService.getUsernameFromToken();
    const name = this.userForm.get('name')?.value;
    const phone = this.userForm.get('phone')?.value;
    const city = this.userForm.get('city')?.value;
    const date = this.userForm.get('date')?.value;
    const type = this.userForm.get('type')?.value;
    const photographer = this.userForm.get('photographer')?.value;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('phone', phone);
    formData.append('city', city);
    formData.append('date', date);
    formData.append('type', type);
    formData.append('photographer', photographer);


    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtToken}`
    });

    this.httpClient.post('http://localhost:8080/user/create/reservation', formData, { headers, responseType: 'text' })
    .subscribe(
      response => {
        console.log('Reservation created:', response);
        alert("Reservation created successfully!");
        this.userForm.get('name')?.setValue('');
        this.userForm.get('phone')?.setValue('');
        this.userForm.get('city')?.setValue('');
        this.userForm.get('date')?.setValue('');
        this.userForm.get('type')?.setValue('');
        this.userForm.get('photographer')?.setValue('');
      },
      error => {
        console.error('Error creating reservation:', error);
      }
    );
    console.log(formData);
  }


  onBlurMethod(event: Event) {

    let city = (event.target as HTMLInputElement).value;
    city = city.toLowerCase();
    

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtToken}`
    });
    
    this.httpClient.get(`http://localhost:8080/user/city/${city}`, { headers })
      .subscribe(
        photographers => {
          this.photographers = photographers;
        },
        error => {
          console.error('Error fetching photographers:', error);
          this.photographers = [];
        }
      );

  }


}
