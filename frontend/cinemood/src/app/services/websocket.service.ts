import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class WebsocketService {

  private socket;
  constructor() { }

  connect(): Rx.Subject<MessageEvent> {
    this.socket = io('http://localhost:3000');
    let observable = new Observable(observable => {
      this.socket.on('mood', (data) => {
        console.log('Received mood from Websocket Service');
        observable.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    let observer = {
      next: (data: Object) => {
        this.socket.emit('mood', data);
      },
    };

    return Rx.Subject.create(observer, observable);
  }
}
