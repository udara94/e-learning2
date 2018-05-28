import { Component } from '@angular/core';
import {  NavController, NavParams ,AlertController} from 'ionic-angular';
import firebase from 'firebase';
import {ProfileProvider} from '../../providers/profile/profile'
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

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

  public userProfile:any;
  qu: FirebaseListObservable<any>;
  public email:any;
  public MyQuestio_arr: Array<any> = [];
  public myEmail:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl:AlertController,
  public ProfileProvider:ProfileProvider,
  public db: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ForgotPasswordPage');


    // this.ProfileProvider.getUserProfile().once('value', userProfileSnapshot => {

    //   this.userProfile = userProfileSnapshot.val();

   
    //   this.email=this.userProfile.email;

    

    //   console.log("profile picture:"+this.email);
    // });

  }
  
getemail(){
  //var query=firebase.database().ref('/user').orderByChild('email').equalTo(this.email);
  //console.log("email is"+ query);
 // query.once('value', Snapshot=>{

    //Snapshot.forEach(emailSnapshot=>{
     // console.log("emailSnapshot: "+emailSnapshot)
     // return true;
   // })
   // console.log("value"+Snapshot.val().email);
 // })
 this.qu = this.db.list('/user');
 this.qu.subscribe(events=>{
   let event = events;
this.MyQuestio_arr=event;
let myevent=events;
this.MyQuestio_arr=myevent.filter(event=>{
 // console.log("email is kkkkk: "+event.email);
;
if(event.email==this.email){
  console.log("email is aaaaaaa:"+ event.email);
  this.myEmail=event.email
}
console.log("my email is: "+ this.myEmail);
 //this.resetPassword(this.myEmail)
})
 })
}

  resetPassword(email: string): Promise<void> {
    email=this.myEmail
    console.log("aaaaaaaaaaaaaaaaaaaa: "+email);
    return firebase.auth().sendPasswordResetEmail(this.myEmail)

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

  back(){
    this.navCtrl.pop();
  }
  
}
