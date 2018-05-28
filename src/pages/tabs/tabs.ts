import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



import { HomePage } from '../home/home';
import {QustionListPage} from '../qustion-list/qustion-list';
import {MyQuestionPage} from '../my-question/my-question';
import {SettingsPage} from '../settings/settings';
import { QuesionsPage } from '../quesions/quesions';
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {


  tab1Root = HomePage;
  tab2Root = QustionListPage;
  tab3Root = MyQuestionPage;
  tab4Root =SettingsPage;
  constructor() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
