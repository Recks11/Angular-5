import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyDYOlqDc2IxFV3G7mpM0xlVSF7875kqUaQ',
      authDomain: 'ng-recipe-book-1963f.firebaseapp.com'
    });
  }
}
