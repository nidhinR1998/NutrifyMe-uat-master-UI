import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { InjectionToken } from '@angular/core';
import { GoogleInitOptions, SocialAuthService, SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';

// Create an injection token for the configuration
export const SOCIAL_AUTH_CONFIG = new InjectionToken<SocialAuthServiceConfig>('SocialAuthServiceConfig');

export const socialAuthServiceConfig: SocialAuthServiceConfig = {
  autoLogin: false,
  providers: [
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider('YOUR_GOOGLE_CLIENT_ID', {
        scopes: ['profile', 'email'], // Corrected property name
      }),
    },
    // Add more providers here if needed
  ],
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    FooterComponent
  ],
  animations: [
    trigger('linkAnimation', [
      state('hover', style({
        color: '#ffeb3b',
        transform: 'scale(1.1)'
      })),
      state('default', style({
        color: '#fff',
        transform: 'scale(1)'
      })),
      transition('default <=> hover', animate('0.3s'))
    ])
  ],
  providers: [
    { provide: SOCIAL_AUTH_CONFIG, useValue: socialAuthServiceConfig },
    SocialAuthService
  ]
})
export class AppComponent implements OnInit {
  title = 'diet-app';
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(auth => {
      this.isAuthenticated = auth;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
