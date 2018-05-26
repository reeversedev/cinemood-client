import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { WebsocketService } from './websocket.service';

@Injectable()
export class NotificationService {

  constructor(private http: Http, private websocketService: WebsocketService) {
    this.websocketService.mateRequest().subscribe(res => console.log('New Friend Request received' , res));
  }

  checkMateRequest(username) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/notification/mate-request/' + username, { headers: headers }).map(res => res.json());
  }
  addMate(request, user) {
    const requestPack = {
      'sender': request,
      'user': user
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/notification/add-mate', requestPack, { headers: headers }).map(res => res.json());
  }

}
