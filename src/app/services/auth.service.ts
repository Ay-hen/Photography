import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError,filter,map,tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';
import  {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private previousUrl: string = '';
  private currentUrl: string;

  private router = inject(Router);

  private usernameSource = new BehaviorSubject<string>('');
  currentUsername = this.usernameSource.asObservable();

  private baseUrl = 'http://localhost:8080/user/auth/'; 
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userRoleSubject = new BehaviorSubject<string | null>(null); 

  constructor(private http: HttpClient) {
    this.currentUrl = this.router.url;
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.previousUrl = this.currentUrl;
      this.currentUrl = event.urlAfterRedirects;
    });
  }

  /* ************************************************************************************************** */

  login(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}login`;
    const user = { username, password };
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(url, user, httpOptions).pipe(
      map((response: any) => {
        if (response && response.token && response.role) {
          const token = response.token;
          const role = response.role;
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);
          this.isAuthenticatedSubject.next(true);
          this.userRoleSubject.next(role);
          console.log(`the ROLE is ${role}`)
          // Redirect based on role (optional)
          if (role === "client") {
            this.router.navigate(['home']);
          } else if (role === 'photographer') {
            this.router.navigate(['/profile']);
          } else {
            this.router.navigate(['/admin/accounts']);
          }

          return response;
        } else {
          console.error('Invalid login response:', response);
          throw new Error('Invalid login credentials'); // Handle invalid credentials
        }
      }),
      catchError(error => this.handleError(error))
    );
  }

  /* ************************************************************************************************** */

  registerUser(name: string, username: string, email: string, password: string): Observable<any> {
    const url = 'http://localhost:8080/user/auth/register';
    const user = {
      name: name,
      username: username,
      email: email,
      password: password,
      role: "client"
    };

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(url, user, httpOptions).pipe(
      tap((response: any) => {
        // Ensure response is in JSON format
        if (response && response.token && response.role) {
          const token = response.token;
          const role = response.role;
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);
          this.userRoleSubject.next(role);
          this.isAuthenticatedSubject.next(true);
          this.router.navigate(['/home']);
        } else {
          console.error('Invalid response format:', response);
        }
      }),
      catchError(this.handleError)
    );
  }

  /* ************************************************************************************************** */

  registerPhotographer(name: string, username: string, email: string, city:string, phone:string,password: string): Observable<any> {
    const url = 'http://localhost:8080/user/auth/register';
    const user = {
      name: name,
      username: username,
      email: email,
      password: password,
      city: city,
      phone: phone,
      role: "photographer"
    };

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(url, user, httpOptions).pipe(
      tap((response: any) => {
        // Ensure response is in JSON format
        console.log(response);
        if (response && response.token && response.role) {
          const token = response.token;
          const role = response.role;
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);
          this.userRoleSubject.next(role);
          this.isAuthenticatedSubject.next(true);
          this.router.navigate(['/profile']);
        } else {
          console.error('Invalid response format:', response);
        }
      }),
      catchError(this.handleError)
    );
  }

  /* ************************************************************************************************** */

  private handleError(error: any) {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      
      errorMessage = 'An error occurred: ' + error.error.message;
    } else {
      
      errorMessage = `Backend returned code ${error.status}: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getCurrentAuthUser(username:string) {
    return this.http.get(`http://localhost:8080/user/get-user/${username}`);
  }

  getRole(): string  {
    return localStorage.getItem('role') || '';
  }

  /* ************************************************************************************************** */
  logout(){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    const username = this.getUsernameFromToken();
    this.http.post(`http://localhost:8080/user/auth/logout`,username,httpOptions);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.isAuthenticatedSubject.next(false);
    this.userRoleSubject.next(null);
    this.router.navigate(['/login']);
  }

  getActiveRoute(): string {
    return this.previousUrl;
  }

  setRoute(route: string) {
    this.previousUrl = route;
  }

  getUsernameFromToken(): any {
    const token = localStorage.getItem('token');
    if (!token) {
      return '';
    }
  
    const decodedToken = jwtDecode(token);
    return decodedToken.sub;
  }
}
