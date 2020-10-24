import { Component, Output } from '@angular/core';
import { Router } from "@angular/router";

import { LoginService } from "../services/login.service";
import { StorageService } from "../services/qr.service";
import { PhotosService } from "../services/photos.service";
import { UserService } from "../services/user.service";
import { User } from '../class/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @Output() title = 'Home';

  public credit: number = 0;
  public email: string;
  private credit10: boolean = false;
  private counteradmin10: number = 0;
  private credit50: boolean = false;
  private counteradmin50: number = 0;
  private credit100: boolean = false;
  private counteradmin100: number = 0;

  constructor(private account: LoginService,
    private router: Router,
    private storage: StorageService,
    private camera: PhotosService) {


    this.account.getUser().then(res => {
      this.email = res.email;
      console.log("Este es el mail en el promise: " + this.email);
    });
  }

  logout() {
    this.account.logout().then(res => {
      this.credit = 0;
      this.credit10 = false;
      this.counteradmin10 = 0;
      this.credit50 = false;
      this.counteradmin50 = 0;
      this.counteradmin100 = 0;
      this.credit100 = true;
      this.router.navigate(['login']);
    }).catch(res => {
      console.log(res);
    });
  }

  clear() {
    this.credit = 0;
  }


  add() {

    try {
      // this.camera.scan().then(barcodeData => {
      // let credit = this.checkQR(barcodeData.text);
      let credit = this.checkQR("8c95def646b6127282ed50454b73240300dccabc");
      this.credit += credit;
      // })
    }
    catch (err) {
      alert(err);
    }
  }

  checkQR(qr: string): number {
    let result = 0;
    if (qr.trim() == "8c95def646b6127282ed50454b73240300dccabc") {
      alert(this.checkAdmin() && this.counteradmin10 == 0);
      if (!this.credit10) {
        if(this.checkAdmin() && this.counteradmin10 == 0) {
          this.counteradmin10++;
          result = 10;
        }
        else if(this.checkAdmin() && this.counteradmin10 == 1) {
          this.counteradmin10++;
          this.credit10 = true;
          result = 10;
        }
        else {

          result = 10;
          this.credit10 = true;
        }
      }
    }
    else if (qr.trim() == "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172") {

      if (!this.credit50) {
        if(this.checkAdmin() && this.counteradmin50 == 0) {
          this.counteradmin50++;
          result = 50;
        }
        else if(this.checkAdmin() && this.counteradmin50 == 1) {
          this.counteradmin50++;
          this.credit50 = true;
          result = 50;
        }
        else {

          result = 50;
          this.credit50 = true;
        }
      }
    }
    else if (qr.trim() == "2786f4877b9091dcad7f35751bfcf5d5ea712b2f") {

      if (!this.credit100) {
        if(this.checkAdmin() && this.counteradmin100 == 0) {
          this.counteradmin10++;
          result = 100;
        }
        else if(this.checkAdmin() && this.counteradmin100 == 1) {
          this.counteradmin100++;
          this.credit100 = true;
          result = 100;
        }
        else {

          result = 100;
          this.credit100 = true;
        }
      }
    }
    return result;
  }

  /**
     * userJSON
     */
  public userJSON() {
    return { "email": this.email, "credit": this.credit };
  }

  checkAdmin() {
    if(this.email.startsWith('admin')) {
      return true;
    }
    return false;
  }

}
