import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Profile } from '../../models/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
//import { HomePage } from '../home/home';
import { EditProfilePage } from '../edit-profile/edit-profile'

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public modelCtrl: ModalController) {
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
