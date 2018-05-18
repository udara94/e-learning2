import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { Profile } from '../../models/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
//import { HomePage } from '../home/home';
import { EditProfilePage } from '../edit-profile/edit-profile';
import firebase from 'firebase';
import { UserProvider } from '../../providers/user/user';
import { ProfileProvider } from '../../providers/profile/profile';
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';




@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {


  captureDataUrl: string;
  URL: string;

  public currentUser: any;
  public sliceUser: any;
  public userid: any;
  public userProfile: any;
  public user: any;

  public displayUsername: any;
  public displayFirstName: any;
  public displayLastName: any;
  public displayEmail: any;
  public displayMobileNo: any;
  public displayFeild: any;
  public imageURL: any = "";
  isenable:any="true";
  public buttonClicked:boolean=false;


  //items: FirebaseListObservable<Item[]> = null;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public modelCtrl: ModalController,
    public userService: UserProvider,
    public ProfileProvider: ProfileProvider,
    public loadingCtrl: LoadingController,
    public actionSt: ActionSheetController,
    public camera: Camera,
    public alertCtr: AlertController) {


    this.currentUser = firebase.auth().currentUser.email;
    this.sliceUser = this.currentUser.slice(0, -11);
    console.log("current user" + this.sliceUser);
    this.userid = firebase.auth().currentUser.uid;

    // this.showPrompt();

  }

  ionViewDidLoad() {

    this.setDetails();
    this.isenable=true;

  }

  setDetails() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.ProfileProvider.getUserProfile().on('value', userProfileSnapshot => {
      loading.dismiss();
      this.userProfile = userProfileSnapshot.val();

      console.log("userprofile" + this.userProfile.ITNo);


      console.log("email: " + this.userProfile.email);
      // console.log("mobile: " + this.userProfile.mobile);
      // console.log("feild: " + this.userProfile.feild);
      console.log("imageURL:" + this.userProfile.imageURL);
      this.displayUsername = this.userProfile.ITNo;
      this.displayFirstName = this.userProfile.fname;
      this.displayEmail = this.userProfile.email;
      this.imageURL=this.userProfile.imageURL;

      if (this.imageURL == "") {
        this.imageURL = "https://firebasestorage.googleapis.com/v0/b/cpmad-83d5d.appspot.com/o/images%2FUser_icon_BLACK-01.png?alt=media&token=1e171c21-b6fd-405c-b409-97ad6b4b1e26"
      }
      else {
        this.imageURL = this.userProfile.imageURL
      }
      console.log("imageURL:" + this.userProfile.imageURL);


    });
  }

  EditButtonClick() {

    this.buttonClicked = !this.buttonClicked;
}

saveButtonClick(){
  this.buttonClicked = !this.buttonClicked;
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

updateuser() {

  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  loading.present();

  this.userid=firebase.auth().currentUser.uid;
  
  this.user=firebase.database().ref('user/'+this.userid).update({
    imageURL:this.imageURL,
    fname:this.displayFirstName,
    email:this.displayEmail,
  })
  .then(res=>{
    
    this.upload();
    loading.dismiss();
    console.log(res);
    console.log("image url: "+this.imageURL);
  })
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
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  
  loading.present();
  let storageRef = firebase.storage().ref();

  // Create a timestamp as filename
  const filename = Math.floor(Date.now() / 1000);

  // Create a reference to 'images/todays-date.jpg'
  const imageRef = storageRef.child(`images/${filename}.jpg`);
  loading.dismiss();
  imageRef.putString(this.imageURL, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {

    this.showSuccesfulUploadAlert();
  });

  //this.updateuser();

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





  editProfileBtnClick(){
    this.isenable=false;
  }

  // showPrompt() {
  //   let prompt = this.alertCtr.create({
  //     title: 'Profile',
  //     message: "Enter the username to view the profile",
  //     inputs: [
  //       {
  //         name: 'Username',
  //         placeholder: 'Username'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'OK',
  //         handler: data => {
  //           console.log('press ok');
  //           //this.onclick();
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }

  // onclick() {
  //   this.displayUsername = this.userProfile.ITNo;
  //   this.displayFirstName = this.userProfile.fname;
  //   this.displayLastName = this.userProfile.lname;
  //   this.displayEmail = this.userProfile.email;
  //   this.displayMobileNo = this.userProfile.mobile;
  //   this.displayFeild = this.userProfile.feild;
  //   //this.imageURL=this.userProfile.imageURL;
  //   if(this.imageURL=="undefined"){
  //     this.imageURL="../assets/imgs/books.jpg"
  //   }
  //   else{
  //     this.imageURL=this.userProfile.imageURL
  //   }
  // }





}
