import { Component } from '@angular/core';
import {  NavController, NavParams ,ActionSheetController,LoadingController,AlertController} from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
import {ProfilePage} from '../profile/profile'
/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {


  public displayUsername: any;
  public displayFirstName: any;
  public displayLastName: any;
  public displayEmail: any;
  public displayMobileNo: any;
  public displayFeild: any;
  public imageURL="";
  public userProfile: any;
  public captureDataUrl: string;
  public userid: any;
  public user:any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public ProfileProvider:ProfileProvider,
    public actionSt:ActionSheetController ,
    public camera:Camera,
    public loadingCtrl:LoadingController,
    public alertCtr:AlertController) {
  }

  ionViewDidLoad() {

    this.ProfileProvider.getUserProfile().on('value', userProfileSnapshot => {

      this.userProfile = userProfileSnapshot.val();

     
      console.log("imageURL:"+this.userProfile.imageURL);
     
    });
    console.log('ionViewDidLoad EditProfilePage');
    this.displayFirstName=this.navParams.get('displayFirstName');
    this.displayLastName=this.navParams.get('displayLastName');
    this.displayEmail=this.navParams.get('displayEmail');
    this.displayMobileNo=this.navParams.get('displayMobileNo')
    //this.imageURL=this.userProfile.imageURL
    console.log('imageURL:'+this.imageURL);
    if(this.imageURL==""){
      this.imageURL="../assets/imgs/books.jpg"
      console.log("sdijsijfisj"+this.imageURL)
    }
    else{
      this.imageURL=this.userProfile.imageURL
    }
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

  }
  upload() {
    this.presentLoadingDefault();
    let storageRef = firebase.storage().ref();
  
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);

    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {

      this.showSuccesfulUploadAlert();
    });

    //this.updateuser();

  }

  updateuser() {
    this.userid=firebase.auth().currentUser.uid;
    this.user=firebase.database().ref('user/'+this.userid).update({
     // imageURL:this.imageURL,
      fname:this.displayFirstName,
      lname:this.displayLastName,
      email:this.displayEmail,
      mobile:this.displayMobileNo
    })
    .then(res=>{
      console.log(res);
      console.log("image url: "+this.imageURL);
    })
}

save(){
  this.updateuser();
  if(this.imageURL=="../assets/imgs/books.jpg"){
    console.log("profile picture didnt change");
  }
  else{
  this.upload();
  console.log("profile picture change");
  }
  this.navCtrl.push(ProfilePage)
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

  showSuccesfulUploadAlert() {
    let alert = this.alertCtr.create({
      title: 'Uploaded!',
      subTitle: 'Picture is uploaded to Firebase',
      buttons: ['OK']
    });
    alert.present();

    // clear the previous photo data in the variable
    this.captureDataUrl = "";
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
            text:'Remove profile picture',
            handler:()=>{
              console.log('remove picture clicked')
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
  }

  close(){
    this.navCtrl.pop();
  }
}
