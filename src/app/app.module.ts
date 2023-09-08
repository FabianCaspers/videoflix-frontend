import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MovieSliderComponent } from './components/movie-slider/movie-slider.component';
import { HttpClientModule } from '@angular/common/http';
import { MoviesService } from './services/movies.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { SearchComponent } from './components/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AngularFireModule } from '@angular/fire/compat';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './components/profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieSliderComponent,
    NavbarComponent,
    MovieDetailsComponent,
    SearchComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDC_YpICnaeriPy7hE26VcJqpOh3LxnZlU",
      authDomain: "flixhub-b3a0e.firebaseapp.com",
      projectId: "flixhub-b3a0e",
      storageBucket: "flixhub-b3a0e.appspot.com",
      messagingSenderId: "1064533409454",
      appId: "1:1064533409454:web:45eb651f0b0423c238f73f"
    }),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyDC_YpICnaeriPy7hE26VcJqpOh3LxnZlU",
      authDomain: "flixhub-b3a0e.firebaseapp.com",
      projectId: "flixhub-b3a0e",
      storageBucket: "flixhub-b3a0e.appspot.com",
      messagingSenderId: "1064533409454",
      appId: "1:1064533409454:web:45eb651f0b0423c238f73f"
    })),
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
