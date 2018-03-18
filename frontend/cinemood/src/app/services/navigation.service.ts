import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MatSidenav, MatDrawer } from '@angular/material';

@Injectable()
export class NavigationService {

  public sideNav: MatDrawer;

  public setSidenav(sideNav: MatDrawer) {
    this.sideNav = sideNav;
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

}
