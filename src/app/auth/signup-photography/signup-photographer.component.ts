import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../app.component.models'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup-photographer',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './signup-photographer.component.html',
  styleUrls: ['./signup-photographer.component.scss']
})
export class SignupComponentPhotographer {
  Behind: string = "../../../assets/behindGrad.jpg";
  Photos: string = "../../../assets/photoPics.png";

  authService = inject(AuthService);
  router = inject(Router);

  error: boolean = false;

  userForm : FormGroup;

  constructor(){
    this.userForm = new FormGroup({
      name: new FormControl("",[Validators.required,Validators.minLength(8),Validators.maxLength(25)]),
      username: new FormControl("",[Validators.required,Validators.minLength(4)]),
      email: new FormControl("",[Validators.required,Validators.email]),
      phone: new FormControl("",[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      city: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required])
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
  
    let { name, username, email, city, phone, password  } = this.userForm.value;


    city = city.toLowerCase();
  
    this.authService.registerPhotographer(name, username, email, city, phone, password).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/profile']);
      },
      (error) => {
        this.error =true;
      }
    );
  }
}
