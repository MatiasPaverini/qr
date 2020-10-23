import { Component, Output } from '@angular/core';
import { Router } from "@angular/router";

import { LoginService } from "../services/login.service";
import { QrService } from "../services/qr.service";
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

  private user: User = new User("admin@dsgjslk", "admin");

  constructor(private account: LoginService,
    private router: Router,
    private qrService: QrService,
    private camera: PhotosService,
    private userService: UserService) {
    this.user = new User("admin@dsgjslk", "admin");
  }

  logout() {
    this.account.logout().then(res => {
      console.log(res);
      this.router.navigate(['login']);
    }).catch(res => {
      console.log(res);
    });
  }

  clear() {
    this.user.Credit = 0;
    alert("Volvimos a 0.");
  }


  add() {
    // alert("Cargando mucha plata.");
    // this.credit += 100;

    try {
      this.camera.scan().then(barcodeData => {
        let credit = this.qrService.add(barcodeData.text);
        this.user.Credit += credit;
      })
    }
    catch (err) {
      alert(err);
    }
  }

}
