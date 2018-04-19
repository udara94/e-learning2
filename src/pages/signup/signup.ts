import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController,ToastController} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {LoginPage} from '../login/login';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
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
    passwordRetyped:'',
    username:'',
    feild:''
  };

 

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private toastCtrl: ToastController) {


    this.signupData.email = "";
    this.signupData.feild = "";
    this.signupData.ITNo = "";
    this.signupData.password = "";
    this.signupData.passwordRetyped = "";
    this.signupData.username = "";

    this.signupData.email = this.navParams.get('email');
  }

  addUser() {
    if (this.signupData.email == "" ||this.signupData.feild==""||  this.signupData.ITNo==""|| this.signupData.password==""||this.signupData.passwordRetyped==""|| this.signupData.username=="") 
    {
      this.presentTost();
    }
    else {
      try {
        this.db.list('/Users').push({
          ITNo:this.signupData.email,
          username: this.signupData.username,
          feild: this.signupData.feild,
          email: this.signupData.ITNo
        })
        //this.Alertsuccessfull();
      
      } catch{
        //this.AlertNotSuccessfull();
      }
    }
  }

  Alertsuccessfull() {
    let alertmsg = this.alertCtrl.create({
      title: 'Successful',
      message: 'You successfully registerd',
      buttons: ['Ok']
    });
    alertmsg.present(alertmsg);
  }

  AlertNotSuccessfull() {
    let alertmsg = this.alertCtrl.create({
      title: 'Error',
      message: 'Something wrong happen',
      buttons: ['Ok']
    });
    alertmsg.present(alertmsg);
  }

  presentTost() {
    let toast = this.toastCtrl.create({
      message: 'please fill all details',
      duration: 5000
    });
    toast.present();
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
  this.Alertsuccessfull();
  this.addUser();
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
