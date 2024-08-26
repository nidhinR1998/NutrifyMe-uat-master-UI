import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  userDetail = {
    email: ''
  };

  constructor(private http: HttpClient) {}

  onForgotPassword() {
    const url = 'https://your-api-endpoint.com/forgot-password'; // Replace with your actual endpoint
    this.http.post(url, { email: this.userDetail.email })
      .subscribe(response => {
        console.log('Password reset link sent successfully', response);
      }, error => {
        console.error('Password reset request failed', error);
      });
  }
}
