import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {LoginPage} from '../login/login'
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupData ={
    ITNo:'',
    email:'',
    password:'',
    passwordRetyped:''
  };

 

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl:AlertController,
              private afAuth:AngularFireAuth) {
    this.signupData.email = this.navParams.get('email');
  }

signup(){
  if(this.signupData.password !==this.signupData.passwordRetyped){
    let alert =this.alertCtrl.create({
      title:'Error',
      message:'Password and Re-entered password does not match ',
      buttons:['OK']
    });
    alert.present();
    return;
  }

  this.afAuth.auth.createUserWithEmailAndPassword(this.signupData.email+'@domain.xta',this.signupData.password)
  .then(auth=>{
  console.log(auth);
  })
  .catch(err =>{
    let alert =this.alertCtrl.create({
      title:'Error',
      message:err.message,
      buttons:['OK']
    });
    alert.present();

  });
  this.loginPage();
}

loginPage(){
  this.navCtrl.push(LoginPage);
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
