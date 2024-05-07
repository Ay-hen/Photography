import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../app.component.models';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


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

  user : User = {} as User;

  userForm : FormGroup;

  constructor(){
    this.userForm = new FormGroup({
      fullname: new FormControl("",[Validators.required,Validators.minLength(8),Validators.maxLength(25)]),
      username: new FormControl("",[Validators.required,Validators.minLength(4)]),
      email: new FormControl("",[Validators.required,Validators.email]),
      password: new FormControl("",[Validators.required])
    });
  }

  onSubmit(){
    console.log(this.userForm);
    this.user = this.userForm.value;
    this.user.role = "client";
    console.log(this.user);
  }
}
