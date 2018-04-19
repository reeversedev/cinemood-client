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
    const observable = new Observable(observable => {
      this.socket.on('mood', (data) => {
        console.log('Received mood from Websocket Service');
        observable.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    const observer = {
      next: (data: Object) => {
        this.socket.emit('mood', data);
      },
    };
    return Rx.Subject.create(observer, observable);

  }

  vote(): Rx.Subject<MessageEvent> {
    const voteObservable = new Observable(voteObservable => {
      this.socket.on('vote', (data) => {
        console.log('Received vote from Websocket Service', data);
        voteObservable.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    const voteObserver = {
      next: (data: Object) => {
        this.socket.emit('vote', data);
      },
    };

    return Rx.Subject.create(voteObserver, voteObservable);

  }

  newMessage(): Rx.Subject<MessageEvent> {
    this.socket = io('http://localhost:3000');
    const messageObservable = new Observable(messageObservable => {
      this.socket.on('message', (data) => {
        console.log('New Message', data);
        messageObservable.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    const messageObserver = {
      next: (data: Object) => {
        this.socket.emit('new-message', data);
      },
    };

    return Rx.Subject.create(messageObserver, messageObservable);
  }
}
