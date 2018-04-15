import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import { SelectSearchable } from 'ionic-select-searchable';
import firebase from 'firebase';
import { QuesionsPage } from '../quesions/quesions';
/**
 * Generated class for the SearchModulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-search-module',
  templateUrl: 'search-module.html',
})
export class SearchModulePage {

  public countryList: Array<any>;
  public loadedCountryList: Array<any>;
  public countryRef: firebase.database.Reference;

  public selectedModule: any;
  public search: any = "";
  public searchModule: any = "";


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {

    this.countryRef = firebase.database().ref('/countries');

    this.countryRef.on('value', countryList => {
      let countries = [];
      countryList.forEach(country => {
        countries.push(country.val());
        return false;
      });

      this.countryList = countries;
      this.loadedCountryList = countries;
    });

  }

  initializeItems(): void {
    this.countryList = this.loadedCountryList;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();


    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.countryList = this.countryList.filter((v) => {
      if (v.name && q) {
        if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
    console.log(q, this.countryList.length);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchModulePage');
  }

  getTheModule(module) {
    this.selectedModule = module;
    console.log(module);
    //this.passModule(this.searchModule);
    //this.close();
  }


  passModule(selectedModule) {
    this.viewCtrl.dismiss();
    this.navCtrl.push(QuesionsPage, { selectedModule });
  }


  close() {
    this.navCtrl.pop();
  }
}
