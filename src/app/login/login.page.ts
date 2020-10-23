import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { LoginService } from "../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public title: string = "Login";

  username:string;

  password:string;

  message: string = "";

  flag:boolean;

  constructor(public loginService: LoginService, private router: Router) { }

  ngOnInit() {}

  public login() :void {

    this.getFireBaseUser(this.username, this.password);
    
  }


  public register() :void {
  
    this.createUserFireBase(this.username, this.password);

  }


  public submit() {
    this.getFireBaseUser(this.username, this.password);
  }

  private createUserFireBase(email:string, password:string) {

    this.loginService.register(email, password).then(res => {
      console.log(res);

      this.message = "Registro exitoso.";
      this.router.navigate(['']);

    }).catch(res => {
      console.log(res);

      this.message = "Error en registro";
    });
  }

  private getFireBaseUser(user:string, pass:string) {

    this.loginService.login(user, pass).then(res => {
      console.log(res);
      this.message = "Autenticación con éxito.";
      this.username = "";
      this.password = "";
      this.message = "";
      this.router.navigate(['home'])
    }).catch(res => {
      console.log(res.message);
        
      this.message = "Email / contraseña inválido.";
    });
  }

  /**
   * fill
   */
  public fill() {
    this.username = "user1@example.com";
    this.password = "user1234";
  }


}
