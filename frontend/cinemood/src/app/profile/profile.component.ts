import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: Object;
  mateRequests = [];

  constructor(
    private websocketService: WebsocketService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      console.log(this.user);
      this.notificationService.checkMateRequest(this.user['username']).subscribe(res => this.mateRequests.push(res));
      // this.notificationService.checkMateRequest(this.user['username']).subscribe(res => console.log(res));
      this.websocketService.mateRequest().subscribe(res => this.mateRequests.push(JSON.parse(res['text'])));
    });
  }
  acceptRequest(request) {
    this.notificationService.addMate(request, this.user).subscribe(res => console.log(res));
  }
}

