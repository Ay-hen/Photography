import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarPhotographerComponent } from "../navbar-photographer/navbar-photographer.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-photographer-dashboard',
    standalone: true,
    templateUrl: './photographer-dashboard.component.html',
    styleUrl: './photographer-dashboard.component.scss',
    imports: [RouterLink, NavbarPhotographerComponent,ReactiveFormsModule]
})
export class PhotographerDashboardComponent {
  userForm : FormGroup;

  constructor(){
    this.userForm = new FormGroup({
      name          : new FormControl(),
      city          : new FormControl(),
      phone         : new FormControl(),
      availability  : new FormControl(),
      email         : new FormControl()
    });
  }

  onSubmit(){
    
  }
}
