import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Profile } from '../../models/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
//import { HomePage } from '../home/home';
import { EditProfilePage } from '../edit-profile/edit-profile';
import firebase from 'firebase';




@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public currentUser: any;
  public sliceUser:any;
  public username:any;
  public field:any;
  public email:any;
  public userid:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public modelCtrl: ModalController) {

    this.currentUser = firebase.auth().currentUser.email;
    this.sliceUser = this.currentUser.slice(0, -11);
    console.log("current user" + this.sliceUser);
    this.userid=firebase.auth().currentUser.uid;

    //this.photoRef=firebase.database().ref(‘users/’+this.currentUser+’/photos’);
    this.username=firebase.database().ref('Users/'+this.userid+'/username');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  /* createProfile(){
    this.afAuth.authState.take(1).subscribe(auth=>{
      this.db.list('profile/${auth.uid}').push(this.profile)
      .then(()=>this.navCtrl.push(HomePage))
    }) 
   }*/

  editProfile() {
    let openEditProfilePage = this.modelCtrl.create(EditProfilePage);
    openEditProfilePage.present();
  }
}
