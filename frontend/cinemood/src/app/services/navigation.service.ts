import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MatSidenav, MatDrawer } from '@angular/material';

@Injectable()
export class NavigationService {

  public sideNav: MatDrawer;
  public messageNav: MatDrawer;

  public setSidenav(sideNav: MatDrawer) {
    console.log(sideNav);
    this.sideNav = sideNav;
  }
  public setMessagenav(messageNav: MatDrawer) {
    console.log(messageNav);
    this.messageNav = messageNav;
  }

  public open() {
    return this.sideNav.open();
  }

  public close() {
    return this.sideNav.close();
  }

  public toggle() {
    this.sideNav.toggle();
  }
  public messageToggle(): void {
    this.messageNav.toggle();
  }

}
