import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NavbarComponent,RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  photographers : any = [];
  authService = inject(AuthService);
  jwtToken = localStorage.getItem('token');
  http = inject(HttpClient);

  text : string = '';

  ngOnInit(): void {
      this.text = 'Search for a photographer that exist on your city';
  }

  search(city: string){
    city = city.toLowerCase();

    console.log(city);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.jwtToken}`
    });
    this.http.get(`http://localhost:8080/user/photographers/${city}`, {headers}).subscribe(
      (photographers) => {
        this.photographers = photographers
        console.log(photographers);
      },
      error => {
        this.text = "There is no photographer in your city, Please try another city";
        this.photographers = [];
      }
    );
  }
}
