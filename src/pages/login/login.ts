import { Component } from '@angular/core';
import {  NavController, NavParams,ToastController,AlertController } from 'ionic-angular';
import {SignupPage} from '../signup/signup';
import {ForgotPasswordPage} from '../forgot-password/forgot-password';
import {AngularFireAuth} from 'angularfire2/auth';
import {HomePage} from '../home/home'
import {TabsPage} from '../tabs/tabs';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginData={
    email:'',
    password:''
  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private afAuth:AngularFireAuth,
              private toastCtrl:ToastController,
              private alrtCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    if(/^[a-zA-Z][a-zA-Z][0-9]{8}$/.test(this.loginData.email)){
    this.afAuth.auth.signInWithEmailAndPassword(this.loginData.email+'@domain.xta',this.loginData.password)
    .then(auth =>{

       this.navCtrl.setRoot(TabsPage);
    })
    
    .catch(err =>{

      let toast =this.toastCtrl.create({
        message:err.message,
        duration:1000
      });
      toast.present();

    });

  }
  else{
    console.log('format of the it number is wrong');
       let toast =this.toastCtrl.create({
        message:'please insert the correct ID number and password!',
        duration:5000
      });
      toast.present();
    
  }

  }

  signup(){
    this.navCtrl.push(SignupPage,{email:this.loginData.email});
    console.log('got some data', this.afAuth.auth.currentUser);
  }

  forgot(){
  this.navCtrl.push(ForgotPasswordPage);
  }

    resetPassword(email: string) {
  //return firebase.auth().sendPasswordResetEmail(email);
  this.afAuth.auth.sendPasswordResetEmail(email);
}

}
