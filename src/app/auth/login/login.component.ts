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
      
      this.authService.login(this.userForm.value.username.toLowerCase(),this.userForm.value.password).subscribe(
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
    if(this.authService.isLoggedIn()){
      const role = this.authService.getRole();
      switch(role) {
        case 'client':
          // Handle client case
          this.router.navigate(['/home']);
          break;
        case 'admin':
          // Handle admin case
          this.router.navigate(['/admin/accounts']);
          break;
        case 'photographer':
          // Handle photographer case
          this.router.navigate(['/profile']);
          break;
        default:          
          this.router.navigate(['/unauthorized']);
      }
    }
    
  }
}
