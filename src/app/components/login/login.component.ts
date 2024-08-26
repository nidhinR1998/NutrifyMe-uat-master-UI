import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],  // Include FormsModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient,private authService: AuthService, private router: Router) {}

  onLogin() {
    const userDetail: Login = {
      username: this.username,
      password: this.password
    };

    this.authService.login(userDetail)
      .subscribe(
        response => {
          if (response.status === 'success') {
            alert('Login successful!');
            this.router.navigate(['/home']);
          } else {
            console.error('Login failed:', response.status);
            alert('Login failed: ' + response.status);
          }
        },
        error => {
          // Handle error
          console.error('Login failed:', error);
          alert('Login failed: Please check your credentials and try again.');
        }
      );
  }
}
