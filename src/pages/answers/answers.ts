import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {QuesionsPage} from '../quesions/quesions';
import {HelpDeskPage} from '../help-desk/help-desk';
import { PopoverController } from 'ionic-angular';
import {PopOverPage} from '../pop-over/pop-over';

/**
 * Generated class for the AnswersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-answers',
  templateUrl: 'answers.html',
})
export class AnswersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public Popctrl:PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnswersPage');
  }

  
   

}
