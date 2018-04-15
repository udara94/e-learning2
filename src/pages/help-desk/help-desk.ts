import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {QuesionsPage} from '../quesions/quesions';
import {AnswersPage} from '../answers/answers';
import { PopoverController } from 'ionic-angular';
import {PopOverPage} from '../pop-over/pop-over';

/**
 * Generated class for the HelpDeskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-help-desk',
  templateUrl: 'help-desk.html',
})
export class HelpDeskPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public Popctrl:PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpDeskPage');
  }

  questions() {
    this.navCtrl.push(QuesionsPage);
  }
  answers() {
    this.navCtrl.push(AnswersPage);
  }

  presentPopover(myEvent) {
    let popover = this.Popctrl.create(PopOverPage);
    popover.present({
      ev: myEvent
    });
  }

}
