import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  username: String;
  password: String;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  onSignIn() {
    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.loginUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['profile']);
      } else {
        this.router.navigate(['signin']);
      }
    });
  }
}
