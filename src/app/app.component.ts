import { Component } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { map, filter, tap, take } from 'rxjs/operators';
import firebase from '@firebase/app';
import 'firebase/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  previewURL: Observable<any>;
  file: Blob;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadPercent: Observable<number>;
  uploadURL: Observable<string>;
  uploadState: Observable<string>;
  downloadURL: Observable<string>;

  constructor(private afStorage: AngularFireStorage){}
  previewFile(event) {
    const file = event.target.files[0];
    if(!file) { return; }
    this.clearUpload();
    const reader = new FileReader();
    this.file = file;
    this.previewURL = fromEvent(reader, 'load').pipe(map((e: any) => e.target.result))
    reader.readAsDataURL(this.file);
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'name-your-file-path-here';
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);

    const randomId = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(`images/${randomId}`);
    this.task = this.ref.put(this.file);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadPercent = this.task.percentageChanges();
    this.uploadURL = task.percentageChanges();
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe()
  }

  pauseUpload() {
    this.task.pause();
  }

  cancelUpload() {
    this.task.cancel();
    this.clearUpload();
  }

  resumeUpload() {
    this.task.resume();
  }

  deleteUpload() {
    this.ref.delete()
      .pipe(
        tap(() => this.clearUpload()),
        take(1)
      ).subscribe();
  }

  clearUpload() {
    this.previewURL = of(null);
    this.uploadPercent = of(0);
    this.uploadURL = of(null);
    this.file = null;
    this.uploadState = undefined;
  }
  
}