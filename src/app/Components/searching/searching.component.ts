import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searching',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.scss']
})
export class SearchingComponent {

  searchQuery: string = '';
  type: string = '';
  filteredCities: string[] = [];
  cities: string[] = [
    'Agadir', 'Al Hoceima', 'Asilah', 'Azrou', 'Azemmour',
    'Beni Mellal', 'Berkane', 'Boujdour', 'Casablanca', 'Chefchaouen',
    'Dakhla', 'El Jadida', 'Essaouira', 'Fes', 'Ifrane', 
    'Kenitra', 'Khouribga', 'Ksar el-Kebir', 'Laayoune', 'Larache',
    'Marrakech', 'Meknes', 'Mohammedia', 'Nador', 'Ouarzazate', 
    'Oujda', 'Rabat', 'Safi', 'Salé', 'Settat', 
    'Sidi Ifni', 'Tangier', 'Taza', 'Tetouan', 'Tiznit'
  ];

  constructor(private router: Router) {}

  onKeyup(search: string) {
    this.type = search;
    this.filteredCities = this.cities.filter(city => 
      city.toLowerCase().startsWith(search.toLowerCase())
    );
  }

  search() {
    console.log(this.type);
    this.router.navigate(['/search', this.type]);
    
  }

  selectCity(city: string) {
    this.type = city;
    this.filteredCities = [];
    
  }
}
