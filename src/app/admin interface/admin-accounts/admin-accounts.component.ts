import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
    selector: 'app-admin-accounts',
    standalone: true,
    templateUrl: './admin-accounts.component.html',
    styleUrl: './admin-accounts.component.scss',
    imports: [NavbarComponent]
})
export class AdminAccountsComponent {
  onSuspension(){

  }
  onDelete(){
    
  }
}
