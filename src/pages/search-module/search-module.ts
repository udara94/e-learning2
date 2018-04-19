import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,ViewController,Content ,Scroll } from 'ionic-angular';
import { SelectSearchable } from 'ionic-select-searchable';
import firebase from 'firebase';
import { QuesionsPage } from '../quesions/quesions';



@Component({
  selector: 'page-search-module',
  templateUrl: 'search-module.html',
})
export class SearchModulePage {

  @ViewChild(Content) content: Content;
  //@ViewChild(Scroll) scroll: Scroll;

  public countryList: Array<any>;
  public loadedCountryList: Array<any>;
  public countryRef: firebase.database.Reference;

  public selectedModule: any;
  public search: any = "";
  public searchModule: any = "";
  showMe =false;

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

  scrollToTop() {
    this.content.scrollToTop();
  }

/*  ngAfterViewInit() {
    this.scroll.addScrollEventListener(this.onScroll);
}
onScroll(event) {
  console.log(event);
  this.showMe=true;
}*/

  close() {
    this.navCtrl.pop();
  }
}
