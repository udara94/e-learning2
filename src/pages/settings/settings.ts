import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {LoginPage} from '../login/login';
import {ProfilePage} from '../profile/profile'
import {HelpDeskPage} from '../help-desk/help-desk';
import {MyDraftPage} from '../my-draft/my-draft';
import {RewardsPage} from '../rewards/rewards';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private fire:AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  logout(){
    this.fire.auth.signOut();
    this.navCtrl.push(LoginPage);
  }

  viewProfile(){
    this.navCtrl.push(ProfilePage);
  }
  viewHelpDesk(){
    this.navCtrl.push(HelpDeskPage);
  }
  viewMyDraft(){
    this.navCtrl.push(MyDraftPage);
  }
  viewMyRewards(){
    this.navCtrl.push(RewardsPage);
  }


}
