import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-admin-accounts',
    standalone: true,
    templateUrl: './admin-accounts.component.html',
    styleUrl: './admin-accounts.component.scss',
    imports: [NavbarComponent]
})
export class AdminAccountsComponent implements OnInit {
  users : any = [];
  clients : any = [];
  photographers : any =[];



  onSuspension(username:string){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtToken}`
    });
    
    this.http.get(`http://localhost:8080/user/suspension/${username}`, { headers })
      .subscribe(
        () => {
          console.error('Suspended ');
          alert('User Suspended');
          window.location.reload();
        },
        error => {
          console.log('Error Suspension User : ', error);
        }
      );
  }
  onUnsuspension(username:string){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtToken}`
    });
    
    this.http.get(`http://localhost:8080/user/unsuspension/${username}`, { headers })
      .subscribe(
        () => {
          console.error('Unsuspend ');
          alert('User unsuspend');
          window.location.reload();
        },
        error => {
          console.log('Error Unsuspend User : ', error);
        }
      );
  }
  onDelete(username:string){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtToken}`
    });
    
    this.http.delete(`http://localhost:8080/user/delete/user/${username}`, { headers })
      .subscribe(
        () => {
          console.error('Deleted ');
          alert('User Deleted');
          window.location.reload();
        },
        error => {
          console.log('Error Deleting User : ', error);
        }
      );

  }

  http = inject(HttpClient);
  authService = inject( AuthService );

  jwtToken = localStorage.getItem('jwtToken');

  ngOnInit():void{

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtToken}`
    });
    
    this.http.get(`http://localhost:8080/user/clients/all`, { headers })
      .subscribe(
        users => {
          this.clients = users;
          console.error('Reservations : ', users);
        },
        error => {
          this.clients = [];
        }
      );
    this.http.get(`http://localhost:8080/user/photographers/all`, { headers })
      .subscribe(
        users => {
          this.photographers = users;
          console.error('Photographers : ', users);
        },
        error => {
          this.photographers = [];
        }
      );
    this.http.get(`http://localhost:8080/user/suspended/all`, { headers })
      .subscribe(
        users => {
          this.users = users;
          console.error('Photographers : ', users);
        },
        error => {
          this.users = [];
        }
      );
    

  }
}
