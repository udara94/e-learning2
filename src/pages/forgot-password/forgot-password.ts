import { Component } from '@angular/core';
import {  NavController, NavParams ,AlertController} from 'ionic-angular';
import firebase from 'firebase';
/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }
  
  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email)

    .then((user) => {
      let alert = this.alertCtrl.create({
        message: "We sent you a reset link to your email",
        buttons: [
          {
            text: "Ok",
            role: 'cancel',
            handler: () => { this.navCtrl.pop(); }
          }
        ]
      });
      alert.present();

    }, (error) => {
      var errorMessage: string = error.message;
      let errorAlert = this.alertCtrl.create({
        message: errorMessage,
        buttons: [{ text: "Ok", role: 'cancel' }]
      });
      errorAlert.present();
    });
  }
  
}
