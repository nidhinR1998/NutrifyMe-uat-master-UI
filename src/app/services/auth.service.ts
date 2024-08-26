import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { environment } from '../../environments/environment';
import { SocialUser } from '../models/social-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = `${environment.apiBaseUrl}/auth`;
  private isAuthenticated$ = new BehaviorSubject<boolean>(false);
  
  constructor(private http: HttpClient) {}
  

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiURL}/register`, user);
  }

  registerGoogleUser(user: SocialUser): Observable<any> {
    // Send Google user data to your backend for processing
    return this.http.post(`${this.apiURL}/register-google`, user);
  }

  login(login: Login): Observable<any> {
    return this.http.post(`${this.apiURL}/login`, login).pipe(
      tap(() => this.isAuthenticated$.next(true))
    );
  }

  logout(): void {
    this.isAuthenticated$.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
    
  }
}
