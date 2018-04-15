import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { QuesionsPage } from '../quesions/quesions';
import { AnswersPage } from '../answers/answers';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { SelectSearchable } from 'ionic-select-searchable';
import firebase from 'firebase';



@Component({
  selector: 'page-qustion-list',
  templateUrl: 'qustion-list.html',
})
export class QustionListPage {

  questions: FirebaseListObservable<any>;

  public countryList: Array<any>;
  public loadedCountryList: Array<any>;
  public countryRef: firebase.database.Reference;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modelCtrl: ModalController,
    private db: AngularFireDatabase,
    public loadingCtrl: LoadingController) {

    //this.questions = db.list('/Question');
    this.presentLoadingDefault();

    this.countryRef = firebase.database().ref('/Question');

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
      if (v.question && q) {
        if (v.question.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.countryList.length);

  }
  

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad QustionListPage');
  }

  addQuestions() {
    let openQuestionPage = this.modelCtrl.create(QuesionsPage);
    openQuestionPage.present();

  }

  provideAnswers() {
    this.navCtrl.push(AnswersPage);
  }
}
