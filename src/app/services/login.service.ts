import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private _collection = 'login';
  
  
  constructor(public firebase: AngularFireAuth) {

  }

  login(email:string, password:string) {
    return this.firebase.signInWithEmailAndPassword(email, password);
  }

  register(email:string, password:string) {
    return this.firebase.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.firebase.signOut();
  }

  getUser() {
    return this.firebase.currentUser;
  }

}
