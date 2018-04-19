import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { MatDrawer, MatSidenav } from '@angular/material';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @ViewChild('messagenav') public messagenav: MatDrawer;

  user = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.profileService.getUser(params.username).subscribe(result => this.user = result);
    });
    this.navigationService.setMessagenav(this.messagenav);
  }

  openMessage() {
    console.log('this is message.');
    this.navigationService.messageToggle();
  }

}
