import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarPhotographerComponent } from "../navbar-photographer/navbar-photographer.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-photographer-dashboard',
    standalone: true,
    templateUrl: './photographer-dashboard.component.html',
    styleUrl: './photographer-dashboard.component.scss',
    imports: [RouterLink, NavbarPhotographerComponent,ReactiveFormsModule]
})
export class PhotographerDashboardComponent {
  userForm : FormGroup;
  editAll = false;

  jwtToken = localStorage.getItem('token');

  http = inject(HttpClient);
  authService = inject(AuthService);

  constructor(){
    this.userForm = new FormGroup({
      name          : new FormControl(""),
      city          : new FormControl(""),
      phone         : new FormControl(""),
      availability  : new FormControl("",[Validators.required]),
      price        : new FormControl("",[Validators.required])
    });
  }

  onSubmit(){
    const formData = new FormData();
    let  price = this.userForm.get('price')?.value + " DH/Hour";
    formData.append('name', this.userForm.get('name')?.value);
    formData.append('city', this.userForm.get('city')?.value.toLowerCase());
    formData.append('phone', this.userForm.get('phone')?.value); 
    formData.append('availability', this.userForm.get('availability')?.value);
    formData.append('price',price );
    formData.append('username',this.authService.getUsernameFromToken())

    this.http.post('http://localhost:8080/user/edit/photographer', formData, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`
      }
    }).subscribe(
      (res) => {
        console.log("Done : ",res);
        alert("Done");
      },
      error => {
        console.error('Error:', error);
        // Handle the error here
      }
);
  }
}
