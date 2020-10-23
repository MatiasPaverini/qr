import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule, AngularFireAuth } from "@angular/fire/auth";
import { environment } from "../environments/environment.prod";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

//<script src="https://www.gstatic.com/firebasejs/7.19.1/firebase-app.js"></script>


// var firebaseConfig = {
//   apiKey: "AIzaSyD1Dng13uLNJ92fezuupJn27uf3YMsldaM",
//   authDomain: "login-59142.firebaseapp.com",
//   databaseURL: "https://login-59142.firebaseio.com",
//   projectId: "login-59142",
//   storageBucket: "login-59142.appspot.com",
//   messagingSenderId: "736259141879",
//   appId: "1:736259141879:web:2591ba6a9936de8723e3f2"
// };


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(environment.firebaseConfig), AngularFireAuthModule],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
