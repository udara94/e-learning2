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
  public myDate: number;
  public postedTime:any;
  public points:number;
  public score:number;
  public user:any;

  
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public toastCtrl:ToastController,
  public alert:AlertController,
public ProfileProvider:ProfileProvider ) {

  var date = new Date();
  this.myDate = date.getTime() 
  this.postedTime=this.myDate;
  }

  ionViewDidLoad() {

    this.key = this.navParams.get('key');
    console.log("key is:"+this.key);

    console.log('ionViewDidLoad PostAnswerPage');
    this.ProfileProvider.getUserProfile().on('value', userProfileSnapshot => {

      this.userProfile = userProfileSnapshot.val();

      this.imageURL=this.userProfile.imageURL;
      this.points=this.userProfile.points;

     
      if(this.points==0){
        this.score=0
      }
      else{
        this.score=this.points
      }
      console.log("pointsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:"+this.points);
     
      if(this.imageURL==""){
        this.imageURL="https://firebasestorage.googleapis.com/v0/b/cpmad-83d5d.appspot.com/o/images%2FUser_icon_BLACK-01.png?alt=media&token=1e171c21-b6fd-405c-b409-97ad6b4b1e26";
        console.log("no profile picture");
      }
    
    });

    this.initializeRef();
    // this.calculateScore();

  }

  calculateScore(){
    this.score=this.score+5;
    console.log("score is:"+this.score)
  }

  updateScore(){
    this.calculateScore();

      this.userid=firebase.auth().currentUser.uid;
      
      this.user=firebase.database().ref('user/'+this.userid).update({
        points:this.score
   
      })
      .then(res=>{
        console.log("points added");
      })
    
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
          fname:this.fname,
          postedTime:this.postedTime,

        });

        this.Alertsuccessfull();
        this.navCtrl.pop();
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
