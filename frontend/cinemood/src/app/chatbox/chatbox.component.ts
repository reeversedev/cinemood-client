import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { Subject, Observable } from 'rxjs/Rx';
import { Request } from '@angular/http';
import { MatDrawer, MatSidenav } from '@angular/material';
import { NavigationService } from '../services/navigation.service';
import { element } from 'protractor';
import { NgxAutoScrollModule, NgxAutoScroll } from 'ngx-auto-scroll';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit, AfterViewChecked {

  @ViewChild('messagenav') public messagenav: MatSidenav;
  @ViewChild('scroll') public scroll: ElementRef;

  user: any;
  message = {};
  messageContent: String;
  messages: Subject<any>;
  allMessages = [];
  receiver: any;

  constructor(
    private wsService: WebsocketService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private navigationService: NavigationService
  ) {
    this.messages = <Subject<any>>wsService.newMessage().map((response: any): any => {
      return response;
    });
    this.authService.getProfile().subscribe(user => this.user = user);
    this.activatedRoute.params.subscribe((params: Params) => {
      this.profileService.getUser(params.username).subscribe((result) => this.receiver = result.username);
    });
  }

  ngOnInit() {
    this.wsService.newMessage().subscribe((doc) => {
      console.log('doc', doc);
      this.allMessages.push(doc['text'][0]);
      console.log(this.allMessages);
    });
    this.navigationService.setMessagenav(this.messagenav);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
    } catch (err) { }
  }
  newMessage() {
    this.message['sender'] = this.user;
    this.message['receiver'] = this.receiver;
    this.message['message'] = this.messageContent;
    this.messages.next(this.message);
    this.messageContent = '';
  }
}
