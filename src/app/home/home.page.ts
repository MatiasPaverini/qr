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
  public message: string = "";

  constructor(private account: LoginService,
    private router: Router,
    private userService: UserService,
    private camera: PhotosService) {


    this.account.getUser().then(res => {
      this.email = res.email;
      this.userService.getData(this.email.substr(0, this.email.indexOf('@'))).subscribe(res => {
        console.log(res.data());
        this.credit50 = res.data().add50;
        this.credit100 = res.data().add100;
        this.credit10 = res.data().add10;
        if(this.checkAdmin()) {
          this.counteradmin100 = res.data().adminInfo['100'];
          this.counteradmin10 = res.data().adminInfo['10'];
          this.counteradmin50 = res.data().adminInfo['50'];
        }
        this.credit = res.data().credit;
      })
    });

    // this.userService.getData(this.email.substr(0, this.email.indexOf('@'))).subscribe(res => {
    //   console.log(res.data());
    // })
  }

  logout() {
    this.account.logout().then(res => {
      this.credit = 0;
      this.credit10 = false;
      this.counteradmin10 = 0;
      this.credit50 = false;
      this.counteradmin50 = 0;
      this.counteradmin100 = 0;
      this.credit100 = false;
      this.router.navigate(['login']);
    }).catch(res => {
      console.log(res);
    });
  }

  clear() {
    this.credit = 0;
    this.credit10 = false;
    this.counteradmin10 = 0;
    this.credit50 = false;
    this.counteradmin50 = 0;
    this.counteradmin100 = 0;
    this.credit100 = false;
    this.userService.saveData(this.userJSON(), this.email.substr(0, this.email.indexOf('@'))).then(
      res => {
        this.message = "Crédito eliminado!";
      }
    ).catch(err => this.message = "Hubo un error al eliminar el crédito.")
      ;
  }


  add() {

    try {
      this.camera.scan().then(barcodeData => {
        let credit = this.checkQR(barcodeData.text);
        // let credit = this.checkQR("8c95def646b6127282ed50454b73240300dccabc");
        this.credit += credit;
        this.userService.saveData(this.userJSON(), this.email.substr(0, this.email.indexOf('@'))).then(res => {
          
        }).catch(err => this.message = "Ocurrió un error al realizar la carga.");
      })
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
        if (this.checkAdmin() && this.counteradmin10 == 0) {
          this.counteradmin10++;
          result = 10;
        }
        else if (this.checkAdmin() && this.counteradmin10 == 1) {
          this.counteradmin10++;
          this.credit10 = true;
          result = 10;
        }
        else {

          result = 10;
          this.credit10 = true;
        }
        this.message = "Carga realizada con éxito.";
      }
      else {
        this.message = "Usted no puede realizar esta recarga.";
      }
    }
    else if (qr.trim() == "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172") {

      if (!this.credit50) {
        if (this.checkAdmin() && this.counteradmin50 == 0) {
          this.counteradmin50++;
          result = 50;
        }
        else if (this.checkAdmin() && this.counteradmin50 == 1) {
          this.counteradmin50++;
          this.credit50 = true;
          result = 50;
        }
        else {

          result = 50;
          this.credit50 = true;
        }
        this.message = "Carga realizada con éxito.";
      }

      else {
        this.message = "Usted no puede realizar esta recarga.";
      }
    }
    else if (qr.trim() == "2786f4877b9091dcad7f35751bfcf5d5ea712b2f") {

      if (!this.credit100) {
        if (this.checkAdmin() && this.counteradmin100 == 0) {
          this.counteradmin100++;
          result = 100;
        }
        else if (this.checkAdmin() && this.counteradmin100 == 1) {
          this.counteradmin100++;
          this.credit100 = true;
          result = 100;
        }
        else {

          result = 100;
          this.credit100 = true;
        }
        this.message = "Carga realizada con éxito.";
      }
      else {
        this.message = "Usted no puede realizar esta recarga.";
      }
    }
    return result;
  }

  /**
     * userJSON
     */
  public userJSON(adminInfo?) {
    if (!this.checkAdmin()) {
      return { "email": this.email, "credit": this.credit, "add10": this.credit10, "add50": this.credit50, "add100": this.credit100 };
    }
    else {
      return { "email": this.email, "credit": this.credit, "add10": this.credit10, "add50": this.credit50, "add100": this.credit100, "adminInfo": this.adminSubInfo() };
    }
  }

  checkAdmin() {
    if (this.email.startsWith('admin')) {
      return true;
    }
    return false;
  }

  adminSubInfo() {
    return { "10": this.counteradmin10, "50": this.counteradmin50, "100": this.counteradmin100 };
  }

}
