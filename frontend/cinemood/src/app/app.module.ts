import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgAutoCompleteModule } from 'ng-auto-complete';

import { MoviedbService } from './services/moviedb.service';
import { AuthService } from './services/auth.service';
import { MoodService } from './services/mood.service';
import { WebsocketService } from './services/websocket.service';

import { Ng2CompleterModule } from 'ng2-completer';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { RouterModule, Routes } from '@angular/router';
import { TvInfoComponent } from './tv-info/tv-info.component';
import { MoodsComponent } from './moods/moods.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'tv-info/:id', component: TvInfoComponent }
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    Ng2CompleterModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [MoviedbService, AuthService, MoodService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
