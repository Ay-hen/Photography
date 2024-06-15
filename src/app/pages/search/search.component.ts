import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar.component';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SearchingComponent } from '../../Components/searching/searching.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NavbarComponent,SearchingComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  photographers : any = [];
  authService = inject(AuthService);
  jwtToken = localStorage.getItem('token');
  http = inject(HttpClient);
  route = inject(ActivatedRoute);

  text : string = '';

  ngOnInit(): void {
      this.text = 'Search for a photographer that exist on your city';
      this.route.params.subscribe((params: Params) => {
        const city = params['city']; 
        if (city) {
          this.search(city); 
        }
      });
  }

  search(city: string){
    city = city.toLowerCase();

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
