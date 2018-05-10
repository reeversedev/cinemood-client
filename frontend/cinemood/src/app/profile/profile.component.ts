import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: Object;
  mateRequests = [];

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    // this.authService.getProfile().subscribe(profile => {
    //   this.user = profile.user;
    //   this.mateRequest = profile.mateRequest;
    //   console.log(this.mateRequest);
    // }, err => {
    //   console.log(err);
    //   return false;
    // });
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      console.log(this.user);
      this.notificationService.checkMateRequest(this.user['username']).subscribe(res => this.mateRequests.push(res));
    });
  }
}
