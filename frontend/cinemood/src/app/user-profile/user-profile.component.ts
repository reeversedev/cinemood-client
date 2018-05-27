import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { MatDrawer, MatSidenav } from '@angular/material';
import { NavigationService } from '../services/navigation.service';
import { AuthService } from '../services/auth.service';
import { WebsocketService } from '../services/websocket.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @ViewChild('messagenav') public messagenav: MatDrawer;

  user = {};
  sender = {};
  request: Subject<any>;
  requestSent: Boolean = false;
  activity: Subject<any>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private navigationService: NavigationService,
    private authService: AuthService,
    private wsService: WebsocketService
  ) {
    this.request = <Subject<any>>wsService.mateRequest().map((response: any): any => {
      return response;
    });
    this.activity = <Subject<any>>wsService.activity().map((res: any): any => {
      return res;
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.profileService.getUser(params.username).subscribe(result => this.user = result);
    });
    this.navigationService.setMessagenav(this.messagenav);
    this.wsService.mateRequest().subscribe(res => console.log(res));
  }

  openMessage() {
    this.navigationService.messageToggle();
  }
  makeRequest() {
    const mateRequest = {};
    mateRequest['receiver'] = this.user['username'];
    this.authService.getProfile().subscribe(self => this.sendRequest(self.user, mateRequest['receiver']));
    this.requestSent = true;
  }
  cancelRequest() {
    console.log('This method is used for cancelling the request');
  }
  sendRequest(sender, receiver) {
    const sentBy = {};
    sentBy['id'] = sender['_id'];
    sentBy['username'] = sender['username'];
    sentBy['name'] = sender['name'];
    sentBy['email'] = sender['email'];
    sentBy['profilePicture'] = sender['profilePicture'];

    const actors = {};
    actors['sender'] = JSON.stringify(sentBy);
    actors['receiver'] = receiver;
    actors['relation'] = 'upcoming-friends';
    this.request.next(actors);
    this.activity.next(JSON.stringify(actors));
  }
}
