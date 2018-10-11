import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireModule } from '../../node_modules/@angular/fire';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBXGUAREAYEc7Z833QjaeOCd7HxACIY99M",
    authDomain: "prueba-3d2d5.firebaseapp.com",
    databaseURL: "https://prueba-3d2d5.firebaseio.com",
    projectId: "prueba-3d2d5",
    storageBucket: "",
    messagingSenderId: "29557385502"
    }),
    AngularFireStorage 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
