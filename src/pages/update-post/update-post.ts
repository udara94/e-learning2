import { Component } from '@angular/core';
import {  NavController, NavParams,ModalController } from 'ionic-angular';
import {SearchModulePage} from '../search-module/search-module';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
import { QuerySnapshot } from '@firebase/firestore-types';
/**
 * Generated class for the UpdatePostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-update-post',
  templateUrl: 'update-post.html',
})
export class UpdatePostPage {

  data:any;
 
  title:any;
  module:any;
  question:any;
  URL:any;
  postedTime:any;
  captureDataUrl: string="";
  userid:any;
  getUserID:any;
  quizRef:any;
  public count:number;
  public selectedModule:any;
  public toUpdatePage:number;


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public modelCtrl:ModalController,
     private camera: Camera,) {

     
      

    

   

   
   this.data = this.navParams.get('data');
  
   

  }

  ionViewDidLoad() {

  console.log('ionViewDidLoad UpdatePostPage');
    
    this.title = this.data.title;
    this.module = this.data.module;
    this.question=this.data.question;
    this.URL=this.data.URL,
    this.postedTime=this.data.postedTime

    this.initializeRef();
    

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
  initializeRef() {

    this.userid = firebase.auth().currentUser.email;
    console.log("userID: " + this.userid);
    this.userid = firebase.auth().currentUser.email;
    this.getUserID = this.userid.slice(0, -19);
    console.log("field is :" + this.getUserID);
    if (this.getUserID == "en" || this.getUserID == "En" || this.getUserID == "EN" || this.getUserID == "eN") {
      this.quizRef = firebase.database().ref('/Engineer');
    }
    else if (this.getUserID == "bm" || this.getUserID == "Bm" || this.getUserID == "BM" || this.getUserID == "bM") {
      this.quizRef = firebase.database().ref('/Business');
    }
    else if (this.getUserID == "it" || this.getUserID == "It" || this.getUserID == "IT" || this.getUserID == "iT") {
      this.quizRef = firebase.database().ref('/IT');
    }
    console.log("dtabase: " + this.quizRef);
  
  }

  updateQuestion(title){
    var query= this.quizRef.orderByChild('title').equalTo(title);
    console.log("title is:"+title)
    query.once('value',questionSnapshot=>{
      questionSnapshot.forEach(snapshot=>{
        snapshot.ref(query).update({
          
          question: this.question,
          title: this.title,
          
        })
        
        .then(res=>{
          console.log("response is:"+res);
        })
      })

    })
  }





  close() {
    this.navCtrl.pop();
  }
}
