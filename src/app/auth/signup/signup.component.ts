import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../app.component.models';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  Behind: string = "../../../assets/behindGrad.jpg";
  Photos: string = "../../../assets/photoPics.png";

  authService = inject(AuthService);
  router = inject(Router);

  userForm : FormGroup;
  error: boolean = false;

  constructor(){
    this.userForm = new FormGroup({
      name: new FormControl("",[Validators.required]),
      username: new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required,Validators.email]),
      password: new FormControl("",[Validators.required])
    });
  }

  onSubmit() {
  if (this.userForm.invalid) {
    return;
  }

  let  { name, username, email, password } = this.userForm.value;

  username = username.toLowerCase();
  email = email.toLowerCase();

  this.authService.registerUser(name, username, email, password).subscribe(
    (response) => {
      console.log(response);
    },
    (error) => {
      this.error = true;
    }
  );
}


}
