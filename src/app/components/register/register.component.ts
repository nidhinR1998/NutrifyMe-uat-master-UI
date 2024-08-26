import { Component, OnInit, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { SocialAuthService, GoogleLoginProvider, SocialUser, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { NgZone, Injector } from '@angular/core';

// Create an InjectionToken for SocialAuthServiceConfig
export const SOCIAL_AUTH_SERVICE_CONFIG = new InjectionToken<SocialAuthServiceConfig>('SOCIAL_AUTH_SERVICE_CONFIG');

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    {
      provide: SOCIAL_AUTH_SERVICE_CONFIG,
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('YOUR_GOOGLE_CLIENT_ID', { scopes: ['profile', 'email'] })
          }
          // Add other providers if needed
        ]
      }
    },
    {
      provide: SocialAuthService,
      useFactory: (config: SocialAuthServiceConfig, ngZone: NgZone, injector: Injector) => {
        return new SocialAuthService(config, ngZone, injector);
      },
      deps: [SOCIAL_AUTH_SERVICE_CONFIG, NgZone, Injector]
    }
  ]
})
export class RegisterComponent implements OnInit {
  fullname: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  status: string = 'New';
  socialUser!: SocialUser;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe(user => {
      this.socialUser = user;
      if (user) {
        console.log('Google user data:', user);
        this.authService.registerGoogleUser(user).subscribe(
          response => {
            if (response.status === 'success') {
              alert('Google registration successful!');
              this.router.navigate(['/home']); // Redirect to home or any other page
            } else {
              console.error('Google registration failed:', response.status);
              alert('Google registration failed: ' + response.status);
            }
          },
          error => {
            console.error('Google registration failed:', error);
            alert('Google registration failed: Please try again.');
          }
        );
      }
    });
  }

  onRegister() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    const userDetail: User = {
      fullname: this.fullname,
      username: this.username,
      email: this.email,
      password: this.password,
      status: this.status
    };

    this.authService.register(userDetail).subscribe(
      response => {
        if (response.status === 'success') {
          alert('Registration successful!');
          this.router.navigate(['/login']);
        } else {
          console.error('Registration failed:', response.status);
          alert('Registration failed: ' + response.status);
        }
      },
      error => {
        console.error('Registration failed:', error);
        alert('Registration failed: Please try again.');
      }
    );
  }

  signUpWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signUpWithApple(): void {
    console.log('Apple sign-in clicked');
    // You can integrate Apple sign-in using a similar method or another service
  }
}
