import { Component } from '@angular/core';
import {  NavController, NavParams,ToastController,AlertController } from 'ionic-angular';
import firebase from 'firebase';
import {ProfileProvider} from '../../providers/profile/profile';

/**
 * Generated class for the PostAnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-post-answer',
  templateUrl: 'post-answer.html',
})
export class PostAnswerPage {


  answer: any;
  public userid:any
  public getUserID: any;
  answerRef: any;
  key: any;
  public userProfile: any;
  public imageURL="";
  fname:any;
  data: any;
  

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public toastCtrl:ToastController,
  public alert:AlertController,
public ProfileProvider:ProfileProvider ) {
  }

  ionViewDidLoad() {

    this.key = this.navParams.get('key');
    console.log("key is:"+this.key);

    console.log('ionViewDidLoad PostAnswerPage');
    this.ProfileProvider.getUserProfile().on('value', userProfileSnapshot => {

      this.userProfile = userProfileSnapshot.val();

      // console.log("userprofile" + this.userProfile.ITNo);
      // console.log("firstName: " + this.userProfile.fname);
      // console.log("lastName: " + this.userProfile.lname);
      // console.log("email: " + this.userProfile.email);
      // console.log("mobile: " + this.userProfile.mobile);
      // console.log("feild: " + this.userProfile.feild);
      // console.log("imageURL:"+this.userProfile.imageURL);
     
      if(this.imageURL==""){
        this.imageURL="../assets/imgs/profile1.png";
        console.log("no profile picture");
      }
      else{
      this.imageURL=this.userProfile.imageURL;
      console.log("imageURL :"+this.imageURL)
      }
    });

    this.initializeRef();

  }
  initializeRef() {

    this.userid = firebase.auth().currentUser.email;
    console.log("userID: " + this.userid);
    this.userid = firebase.auth().currentUser.email;
    this.getUserID = this.userid.slice(0, -19);
    console.log("field is :" + this.getUserID);
    // this.selectFeild();
    if (this.getUserID == "en" || this.getUserID == "En" || this.getUserID == "EN" || this.getUserID == "eN") {
      this.answerRef = firebase.database().ref('Engineer/' + this.key + '/answer/');
    }
    else if (this.getUserID == "bm" || this.getUserID == "Bm" || this.getUserID == "BM" || this.getUserID == "bM") {
      this.answerRef = firebase.database().ref('Business/' + this.key + '/answer/');
    }
    else if (this.getUserID == "it" || this.getUserID == "It" || this.getUserID == "IT" || this.getUserID == "iT") {
      this.answerRef = firebase.database().ref('IT/' + this.key + '/answer/');
    }
    console.log("dtabase: " + this.answerRef);

  }

  addAnswer() {

    this.fname=this.userProfile.fname;
    if (this.answer == "") {
      this.presentTost();
    }
    else {
      try {

      //  this.answerRef = firebase.database().ref('IT/' + this.key + '/answer/');
        console.log("anser ref" + this.answerRef)
        console.log("userAnswer :"+this.answer)
        console.log("imageURL :"+this.imageURL)
        console.log("fname :"+this.fname)

        this.answerRef.push({

          userAnswer: this.answer,
          imageURL:this.imageURL,
          fname:this.fname

        });

        this.Alertsuccessfull();

      } catch{
        this.AlertNotSuccessfull()
      }
    }
  }

  presentTost() {
    let toast = this.toastCtrl.create({
      message: 'please enter the answer',
      duration: 5000
    });
    toast.present();
  }

  Alertsuccessfull() {
    let alertmsg = this.alert.create({
      title: 'Successful',
      message: 'You post the Answer successfully',
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

  close() {
    this.navCtrl.pop();
  }

  protected adjustTextarea(event: any): void {
    let textarea: any = event.target;
    textarea.style.overflow = 'hidden';
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    return;
  }
}
