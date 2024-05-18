import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  Behind: string = "../../../assets/behindGrad.jpg";
  Photos: string = "../../../assets/photoPics.png";

  authService = inject(AuthService);
  router = inject(Router);
  loginError: string | null = null;

  error: boolean = false;

  userForm : FormGroup;
  constructor(){
    this.userForm = new FormGroup({
      username: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required])
    });
  }

  onSubmit(){

    if(this.userForm.invalid){
      return;
    }else{
      
      this.authService.login(this.userForm.value.username,this.userForm.value.password).subscribe(
        (response) => {
          
        },
        (error) => {
          this.error = true;
        }
      );
    }
  }

  getUsername(){
    if(this.userForm.value.username){
      return this.userForm.value.username;
    }
  }

  ngOnInit(): void {
    this.authService.logout();
    
  }
}
