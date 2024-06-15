import { Component, ElementRef, HostListener, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar-photographer',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar-photographer.component.html',
  styleUrl: './navbar-photographer.component.scss'
})
export class NavbarPhotographerComponent implements OnInit{
  authService = inject(AuthService);

  username = this.authService.getUsernameFromToken();

  user:any;

  showSubMenu = false;

  constructor(private eRef: ElementRef) {}

    toggleSubMenu(): void {
        this.showSubMenu = !this.showSubMenu;
    }

  @HostListener('document:click', ['$event'])
  clickout(event:any) {
    if (!this.eRef.nativeElement.contains(event.target) && this.showSubMenu) {
      this.showSubMenu = false;
    }
  }

  ngOnInit(): void {
      
      this.authService.getCurrentAuthUser(this.username).subscribe(
        (resp) => {
          
          this.user = resp;
          console.log(this.user);
        },
        (error) => {
          console.error("Error fetching username: ", error);
        }
      );
      
  }

  logout(){
    //const username = this.authService.getUsernameFromToken();
    this.authService.logout(this.username);
  }


}

