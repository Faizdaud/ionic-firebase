import { Component, OnInit } from '@angular/core';
import { signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  credentials = this.fb.nonNullable.group({
    email:['ahmad@gmail.com', [Validators.required, Validators.email]],
    password:['123456',[Validators.required, Validators.minLength(6)]]
  })

  constructor(
    private fb:FormBuilder,
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController,
    private authService:AuthService,
    private router:Router
  ) { }

  // ngOnInit() {
  // }
  get email(){
    return this.credentials.controls.email
  }

  get password(){
    return this.credentials.controls.password
  }

  async login(){
    const loading = await this.loadingCtrl.create();
    await loading.present();

    const user = await this.authService.login(
      this.credentials.getRawValue()
    );

    console.log('login.ts line 46: logging user', user);
    await loading.dismiss();

    if(user){
      this.router.navigateByUrl('/home', { replaceUrl: true})
    }else{
      this.showAlert('Login Failed!', 'Please try again')
    }
  }

  async register(){
    const loading = await this.loadingCtrl.create();
    await loading.present();

    const user = await this.authService.register(
      this.credentials.getRawValue()
    );

    console.log('login.ts line 58: registering user', user);
    await loading.dismiss();

    if(user){
      this.router.navigateByUrl('/home', { replaceUrl: true})
    }else{
      this.showAlert('Registration Failed!', 'Please try again')
    }

  }

  async resetPassword(){
    const loading = await this.loadingCtrl.create();
    await loading.present();

    const user = await this.authService.resetPassword(this.email.value);
  }

  async showAlert(header:string,message:string){
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons:['Ok']
    })
    await alert.present();
  }

}
