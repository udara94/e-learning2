import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { AnswersPage } from '../answers/answers';
import { HelpDeskPage } from '../help-desk/help-desk';
import { SearchModulePage } from '../search-module/search-module';
import { SelectSearchable } from 'ionic-select-searchable';
import firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'page-quesions',
  templateUrl: 'quesions.html',
})
export class QuesionsPage {




  search: any = "";
  question: string = "";
  module: string = "";
  title: string = "";
  testing: string = "";
  modules: FirebaseListObservable<any>;
  searchModule: any = "";
  selectedModule: any = "";
  myStuff: any;
  captureDataUrl: string;
  URL: string;
  public currentUser: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase,
    private alert: AlertController,
    private toastCtrl: ToastController,
    private modelCtrl: ModalController,
    private viewCtrl: ViewController,
    private camera: Camera) {

 

    this.selectedModule = navParams.get('selectedModule');


    this.title = "";
    this.question = "";
    this.search = "";

    this.alert = alert;

  }



  capture() {
    //setup camera options
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE

    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
      this.URL = this.captureDataUrl;
    }, (err) => {
      console.log("ERROR -> " + JSON.stringify(err));
    });

  }

  loadFromLibrary() {
    let options = {
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
      this.URL = this.captureDataUrl;
    }, (err) => {
      console.log("ERROR -> " + JSON.stringify(err));
    });

  }

  capturePhoto() {
    //this.capture(0);
    // this.capture(1);
  }

  upload() {
    let storageRef = firebase.storage().ref();
    // this.countryRef = firebase.database().ref('/countries');
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);


    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {

      this.showSuccesfulUploadAlert();
    });
  }

  showSuccesfulUploadAlert() {
    let alert = this.alert.create({
      title: 'Uploaded!',
      subTitle: 'Picture is uploaded to Firebase',
      buttons: ['OK']
    });
    alert.present();

    // clear the previous photo data in the variable
    this.captureDataUrl = "";
  }

  protected adjustTextarea(event: any): void {
    let textarea: any = event.target;
    textarea.style.overflow = 'hidden';
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    return;
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad QuesionsPage');
    this.search = this.selectedModule;
  }

  addQuestion() {
    if (this.title == "" || this.question == "") {
      this.presentTost();
    }
    else {
      try {
        this.db.list('/Question').push({
          module: this.search,
          question: this.question,
          title: this.title
        })
        this.Alertsuccessfull();
        //this.close();
        this.viewCtrl.dismiss();
      } catch{
        this.AlertNotSuccessfull();
      }
    }
  }

  addSearchPage() {
    let openSearchModulePage = this.modelCtrl.create(SearchModulePage);
    openSearchModulePage.present();
  }

  enterModule() {
    this.db.list('/countries').push({
      name: this.testing,
    })
  }


  Alertsuccessfull() {
    let alertmsg = this.alert.create({
      title: 'Successful',
      message: 'You post the question successfully',
      buttons: ['Ok']
    });
    alertmsg.present(alertmsg);
  }

  AlertNotSuccessfull() {
    let alertmsg = this.alert.create({
      title: 'Error',
      message: 'Something wrong happen',
      buttons: ['Ok']
    });
    alertmsg.present(alertmsg);
  }

  presentTost() {
    let toast = this.toastCtrl.create({
      message: 'please insert the question and the title',
      duration: 5000
    });
    toast.present();
  }



  answers() {
    this.navCtrl.push(AnswersPage);
  }

  helpDesk() {
    this.navCtrl.push(HelpDeskPage);
  }

  close() {
    this.navCtrl.pop();
  }


}
