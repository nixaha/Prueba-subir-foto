import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-root',
  template: `
  <input type="file" (change)="uploadFile($event)">
  `
})
export class AppComponent {
  constructor(private storage: AngularFireStorage) { }
  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'imagen/legend';
    const task = this.storage.upload(filePath, file);
  }
}
