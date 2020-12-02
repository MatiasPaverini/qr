import { Injectable } from '@angular/core';

import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  public userArray;
  private collection = 'qrUser';

  public saveData(user, doc) {
    return this.firestore.collection(this.collection).doc(doc).set(user);
  }

  public getData(doc) {
    return this.firestore.collection(this.collection).doc(doc).get();
  }
}
