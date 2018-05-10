import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { WebsocketService } from './websocket.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {

  authToken: any;
  user: any;
  connection: any;
  constructor(private http: Http, private wsService: WebsocketService) {
    this.connection = <Subject<any>>wsService.connect().map((response: any): any => {
      return response;
    });
    this.getConnected();
  }

  getConnected() {
    this.getProfile().subscribe(res => this.connection.next(res));
  }
  registerUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/auth/signup', user, { headers: headers }).map(res => res.json());
  }
  loginUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/auth/signin', user, { headers: headers }).map(res => res.json());
  }
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  getProfile() {
    const headers = new Headers;
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/auth/profile', { headers: headers }).map(res => res.json());
  }
  getMateRequests() {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/auth/mate-requests', {headers: headers}).map(res => res.json);
  }
  loggedIn() {
    return tokenNotExpired('id_token');
  }
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
