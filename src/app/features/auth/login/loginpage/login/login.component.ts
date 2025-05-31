import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../core/services/authservice/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObj: any = {
    userName: '',
    password: '',
  };

  constructor(private router: Router, private authService: AuthService) {}

  onLogin() {
    console.log('Login button clicked:', this.loginObj);
    const { userName, password } = this.loginObj;
    if (this.authService.login(userName, password)) {
      console.log('Login successful, navigating...');
      this.router.navigate(['/home'], { replaceUrl: true });
    } else {
      alert('Login failed!');
    }
  }
}
