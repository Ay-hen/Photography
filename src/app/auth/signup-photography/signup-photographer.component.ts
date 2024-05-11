import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { User } from '../../app.component.models'

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

  user : User = {} as User;

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

  onSubmit(){
    this.user = this.userForm.value;
    this.user.role = "photographer";
    console.log(this.user);
  }
}
