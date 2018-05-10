import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { MatDrawer, MatSidenav } from '@angular/material';
import { NavigationService } from '../services/navigation.service';
import { AuthService } from '../services/auth.service';
import { WebsocketService } from '../services/websocket.service';
import { Subject } from 'rxjs';

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
  }

  ngOnInit() {
    this.wsService.mateRequest().subscribe(data => {
      if (data['text'] === 0 || data['text'] === 1) {
        this.requestSent = true;
      }
    });
    this.activatedRoute.params.subscribe((params: Params) => {
      this.profileService.getUser(params.username).subscribe(result => this.user = result);
    });
    this.navigationService.setMessagenav(this.messagenav);
  }

  openMessage() {
    this.navigationService.messageToggle();
  }
  makeRequest() {
    const mateRequest = {};
    mateRequest['receiver'] = this.user['username'];
    this.authService.getProfile().subscribe(self => this.sendRequest(self.user, mateRequest['receiver']));
  }
  cancelRequest() {
    console.log('This method is used for cancelling the request');
  }
  sendRequest(sender, receiver) {
    const sentBy = {};
    sentBy['username'] = sender['username'];
    sentBy['name'] = sender['name'];
    sentBy['email'] = sender['email'];
    sentBy['profilePicture'] = sender['profilePicture'];

    const actors = {};
    actors['sender'] = JSON.stringify(sentBy);
    actors['receiver'] = receiver;
    actors['relation'] = 'upcoming-friends';
    this.request.next(actors);
  }


}
