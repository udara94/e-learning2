import { Component, Input,ViewChild } from '@angular/core';
import { NavController, NavParams ,AlertController,ToastController,LoadingController} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {LoginPage} from '../login/login';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import firebase from 'firebase';
import { Title } from '@angular/platform-browser';
import { Slides } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  @ViewChild(Slides) slides: Slides;

  signupData ={
    ITNo:'',
    fname:'',
    lname:'',
    email:'',
    mobile:'',
    password:'',
    passwordRetyped:'',
    feild:''

  };


public imageURL:any ="https://firebasestorage.googleapis.com/v0/b/cpmad-83d5d.appspot.com/o/images%2FUser_icon_BLACK-01.png?alt=media&token=1e171c21-b6fd-405c-b409-97ad6b4b1e26";
public points=0;
public captureDataUrl:any;
public choose:boolean=true
public value="Skip";
showMe:boolean=true;
backIf:boolean=true;
public counter:number=1;
public registerIf:boolean=true;
 

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private toastCtrl: ToastController,
    public actionSt: ActionSheetController,
    public camera: Camera,
  public loadingCtrl:LoadingController) {

     

    this.signupData.email = "";
    this.signupData.ITNo = "";
    this.signupData.password = "";
    this.signupData.passwordRetyped = "";
    this.signupData.fname = "";

    

    this.signupData.email = this.navParams.get('email');
   
  }

  presentActionSheet() {
    let actionSheet = this.actionSt.create({
      title: 'Change profile picture',
      buttons: [
        {
          text: 'Take new photo',
          role: 'destructive',
          handler: () => {
            console.log('take a new photo');
            this.capture();
          }
        },{
          text: 'Select photo from gallery ',
          handler: () => {
            console.log('load from gallery');
            this.loadFromLibrary();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
   // this.value="Next";
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
      this.imageURL = this.captureDataUrl;
    }, (err) => {
      console.log("ERROR -> " + JSON.stringify(err));
    });
  this.value="Next";
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
      this.imageURL = this.captureDataUrl;
      
    }, (err) => {
      console.log("ERROR -> " + JSON.stringify(err));
    });
    this.value="Next";
  }
 
  Alertsuccessfull() {
    let alertmsg = this.alertCtrl.create({
      title: 'Successful',
      message: 'You successfully registerd',
      buttons: ['Ok']
    });
    alertmsg.present(alertmsg);
  }

  AlertNotSuccessfull() {
    let alertmsg = this.alertCtrl.create({
      title: 'Error',
      message: 'Something wrong happen',
      buttons: ['Ok']
    });
    alertmsg.present(alertmsg);
  }

  presentTost() {
    let toast = this.toastCtrl.create({
      message: 'please fill all details',
      duration: 5000
    });
    toast.present();
  }
// checkAll(){
  
//   if(this.signupData.email==""||this.signupData.fname==""||this.signupData.ITNo==""||this.signupData.password==""||this.signupData.passwordRetyped){
    
//     this.counter=2;
//     console.log("checkall count:"+this.counter)
//   }
//   else{
//     this.counter=1;
//   }
// }

  back(){
   this.navCtrl.pop(); 
  }

  nextSlide(){
  
   
    this.showMe=true;
    this.showMe=this.showMe
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
    
  }
  backtoSlide(){
    this.showMe=!this.showMe
    this.backIf=!this.backIf;
    this.registerIf=!this.registerIf;
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
    console.log("backIf: "+this.backIf);
  }
  skip(){
    this.registerIf=true
    this.backIf=true;
    this.backIf=this.backIf;
    this.showMe=!this.showMe
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
    console.log("backIf: "+this.backIf);
  }

  upload() {
   
   
    let storageRef = firebase.storage().ref();
  
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);
  
    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);
   
    imageRef.putString(this.imageURL, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
  
      console.log("uploaded successfully");
    });
  
    //this.updateuser();
  
  }
  

signup(){
  if(this.signupData.password !==this.signupData.passwordRetyped){
    let alert =this.alertCtrl.create({
      title:'Error',
      message:'Password and Re-entered password does not match ',
      buttons:['OK']
    });
    this.backtoSlide()
    this.backtoSlide();
    alert.present();
    return;
  }

 
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  loading.present();
  if(this.imageURL==""){
    this.imageURL="https://firebasestorage.googleapis.com/v0/b/cpmad-83d5d.appspot.com/o/images%2FUser_icon_BLACK-01.png?alt=media&token=1e171c21-b6fd-405c-b409-97ad6b4b1e26";
    console.log("no profile picture");
  }
  loading.dismiss();
  if(/^[a-zA-Z][a-zA-Z][0-9]{8}$/.test(this.signupData.email)){
  this.afAuth.auth.createUserWithEmailAndPassword(this.signupData.email+'@domain.xta',this.signupData.password)

 .then( newUser => {
  firebase.database().ref('/user').child(newUser.uid)

 
  
  .set({ 
  
    ITNo:this.signupData.email,
    fname: this.signupData.fname,
    email: this.signupData.ITNo,
    imageURL:this.imageURL,
    points: this.points
    
   });
})

.then(auth=>{
  this.upload();
 
  console.log(auth);
  this.Alertsuccessfull();

  })
  .catch(err =>{
    // let alert =this.alertCtrl.create({
    //   title:'Error',
    //   message:err.message,
    //   buttons:['OK']
    // });
    // alert.present();

  });
}
else{
 // this.backtoSlide();
 // this.backtoSlide();
  let toast =this.toastCtrl.create({
    message:'please insert the correct ID number and password!',
    duration:5000
  });
  toast.present();
}
 // this.loginPage();
}

loginPage(){
  this.navCtrl.push(LoginPage);
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    this.slides.lockSwipes(true);
  }

}
