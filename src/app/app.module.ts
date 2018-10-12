import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

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
  storageBucket: "prueba-3d2d5.appspot.com",
    }),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
