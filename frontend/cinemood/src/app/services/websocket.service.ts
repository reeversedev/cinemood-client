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
    const observable = new Observable(oBservable => {
      this.socket.on('mood', (data) => {
        console.log('Received mood from Websocket Service');
        oBservable.next(data);
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
    const voteObservable = new Observable(VoteObservable => {
      this.socket.on('vote', (data) => {
        console.log('Received vote from Websocket Service', data);
        VoteObservable.next(data);
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
    const messageObservable = new Observable(MessageObservable => {
      this.socket.on('message', (data) => {
        console.log('New Message', data);
        MessageObservable.next(data);
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
  mateRequest(): Rx.Subject<MessageEvent> {
    this.socket = io('http://localhost:3000');
    const requestObservable = new Observable(RequestObservable => {
      this.socket.on('mate-request', (data) => {
        RequestObservable.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    const RequestObserver = {
      next: (data: Object) => {
        this.socket.emit('mate-request', data);
      },
    };

    return Rx.Subject.create(RequestObserver, requestObservable);
  }
}
