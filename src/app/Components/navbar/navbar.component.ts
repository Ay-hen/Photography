import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @ViewChild("home") home !: ElementRef;
  
  activate(e: HTMLAnchorElement) {
    if(e !== this.home.nativeElement){
        this.home.nativeElement.classList.remove("active");
        e.classList.add("active");
    }
  }
}
