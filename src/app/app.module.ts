import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { Facebook } from '@ionic-native/facebook';

import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { ImageHanderProvider } from '../providers/image-hander/image-hander';
import { Camera } from "@ionic-native/camera";
import { FileChooser } from "@ionic-native/file-chooser";
import { FilePath } from "@ionic-native/file-path";
import { File } from "@ionic-native/file";
import { GoogleMaps, Geocoder } from "@ionic-native/google-maps";
import { Geolocation } from "@ionic-native/geolocation";
import { ChatProvider } from '../providers/chat/chat';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';


import firebase from 'firebase';
import { DataProvider } from "../providers/data";
import { BookProvider } from '../providers/book/book';
var config = {
  apiKey: "AIzaSyBbhnt2DU-hemPkHLEcedJr6yY8c0PIk-M",
  authDomain: "gatfirebase.firebaseapp.com",
  databaseURL: "https://gatfirebase.firebaseio.com",
  projectId: "gatfirebase",
  storageBucket: "gatfirebase.appspot.com",
  messagingSenderId: "444776173122"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule, AngularFireAuthModule, AngularFireDatabaseModule,HttpModule,
    IonicModule.forRoot(MyApp, {
      platform: {
        android: {
          tabsHideOnSubPages: true
        }
      }
    }), AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    UserProvider,
    Facebook, Camera,
    ImageHanderProvider, File, FilePath, FileChooser,
    Geolocation, GoogleMaps, Geocoder,
    ChatProvider,
    AngularFireAuth, AngularFireDatabase,
    DataProvider,
    BookProvider
  ]
})
export class AppModule { }
