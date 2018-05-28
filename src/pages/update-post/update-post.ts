import { Component,ViewChild } from '@angular/core';
import {  NavController,Content,ViewController, NavParams,ModalController,AlertController } from 'ionic-angular';
import {SearchModulePage} from '../search-module/search-module';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
import { QuerySnapshot } from '@firebase/firestore-types';
import {MyQuestionPage} from '../my-question/my-question';
import {ReferenceProvider} from '../../providers/reference/reference';

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

  @ViewChild(Content) content: Content;
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
  reference:any;
  providerRef:any;
  public count:number;
  public selectedModule:any;
  public toUpdatePage:number;
  public key:any;
  public update:any;
  public updateAnswer:Array<any>=[];
  public url:any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public modelCtrl:ModalController,
     private camera: Camera,
    private alert:AlertController,
    public viewCtrl: ViewController,
  public ref:ReferenceProvider) {
   
   this.data = this.navParams.get('data');
  //this.updateAnswer=this.data;
  this.key=this.data.$key
  this.title=this.data.title;
  this.question=this.data.question;
  this.url=this.data.URL;
  console.log("key:"+this.key)
  }

  ionViewDidLoad() {

  console.log('ionViewDidLoad UpdatePostPage');
  
    
 this.initializeRef();
     
   // this.quizRef=(this.ref.UpdatepostRef()+'/'+this.key);
  //  // this.quizRef=this.reference.quizRef;
    //  console.log("aaaaaaaaaaa:"+this.quizRef);
    //  console.log("bbbbbbbbbbbbbbb:"+this.providerRef);
 
    

  }

  protected adjustTextarea(event: any): void {
    let textarea: any = event.target;
    textarea.style.overflow = 'hidden';
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    return;
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
      this.url = this.captureDataUrl;
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
      this.url = this.captureDataUrl;
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
      this.quizRef = firebase.database().ref('/Engineer/'+this.key);
    }
    else if (this.getUserID == "bm" || this.getUserID == "Bm" || this.getUserID == "BM" || this.getUserID == "bM") {
      this.quizRef = firebase.database().ref('/Business/'+this.key);
    }
    else if (this.getUserID == "it" || this.getUserID == "It" || this.getUserID == "IT" || this.getUserID == "iT") {
      this.quizRef = firebase.database().ref('/IT/'+this.key);
    }
    console.log("dtabase:ssssssssssssssssss " + this.quizRef);
  
  }

  upload() {
    // this.presentLoadingDefault();
    let storageRef = firebase.storage().ref();
    // this.countryRef = firebase.database().ref('/countries');
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);
    


    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {

      // this.showSuccesfulUploadAlert();
    });
  }

  


  updateQuestion(data) {
    
    try{
    this.question=this.quizRef.update({
      title:data.title,
      question:data.question,
      URL:this.url
    })
    .then(res=>{
      this.Alertsuccessfull();
      console.log("success: ");
      console.log("Path:"+this.quizRef);
//       if(this.url==""){
//         console.log("no url");
//     }
//  else{
//     this.upload();
//  }
    })
  }
  catch{
    console.log("not successfull")
    console.log(console.error());
    
  }
  }

  Alertsuccessfull() {
    let alertmsg = this.alert.create({
      title: 'Successful',
      message: 'You edit the question successfully',
      buttons: [{
        text:'Ok',
        handler:data=>{
          this.viewCtrl.dismiss();
          //this.navCtrl.pop();
        }
      }]
    });
    alertmsg.present();
  }




  close() {
    this.navCtrl.pop();
  }
}
