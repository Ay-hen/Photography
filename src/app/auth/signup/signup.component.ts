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
      name: new FormControl("",[Validators.required,Validators.minLength(4),Validators.maxLength(25)]),
      username: new FormControl("",[Validators.required,Validators.minLength(4)]),
      email: new FormControl("",[Validators.required,Validators.email]),
      password: new FormControl("",[Validators.required])
    });
  }

  onSubmit() {
  if (this.userForm.invalid) {
    return;
  }

  const { name, username, email, password } = this.userForm.value;

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
