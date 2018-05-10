import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { NgAutoCompleteModule } from 'ng-auto-complete';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';

import { MoviedbService } from './services/moviedb.service';
import { AuthService } from './services/auth.service';
import { MoodService } from './services/mood.service';
import { WebsocketService } from './services/websocket.service';
import { NavigationService } from './services/navigation.service';
import { ProfileService } from './services/profile.service';
import { NotificationService } from './services/notification.service';

import { Ng2CompleterModule } from 'ng2-completer';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { RouterModule, Routes } from '@angular/router';
import { TvInfoComponent } from './tv-info/tv-info.component';

import { MoodsComponent } from './moods/moods.component';
import { MasonryComponent } from './masonry/masonry.component';

import {
  MatButtonModule, MatCheckboxModule, MatMenuModule,
  MatGridListModule, MatAutocompleteModule, MatNativeDateModule
} from '@angular/material';
import {
  MatIconModule, MatSidenavModule, MatToolbarModule, MatCardModule,
  MatFormFieldModule, MatSelectModule, MatInputModule
} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MasonryModule } from 'angular2-masonry';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MomentModule } from 'angular2-moment';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChatboxComponent } from './chatbox/chatbox.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'tv-info/:id', component: TvInfoComponent },
  { path: 'user/:username', component: UserProfileComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProfileComponent,
    SignupComponent,
    SigninComponent,
    TvInfoComponent,
    MoodsComponent,
    MasonryComponent,
    SidenavComponent,
    UserProfileComponent,
    ChatboxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    Ng2CompleterModule,
    RouterModule.forRoot(appRoutes),
    MasonryModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDatepickerModule,
    MatRadioModule,
    MatNativeDateModule,
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule,
    MomentModule,
    NgxAutoScrollModule
  ],
  providers: [MoviedbService, AuthService, MoodService, WebsocketService, NavigationService, ProfileService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
