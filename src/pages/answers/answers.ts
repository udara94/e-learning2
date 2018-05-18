import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController,ModalController } from 'ionic-angular';
import { QuesionsPage } from '../quesions/quesions';
import { HelpDeskPage } from '../help-desk/help-desk';
import { PopoverController } from 'ionic-angular';
import { PopOverPage } from '../pop-over/pop-over';
import {PostAnswerPage} from '../post-answer/post-answer';
import firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

/**
 * Generated class for the AnswersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-answers',
  templateUrl: 'answers.html',
})
export class AnswersPage {
  data: any;
  title: any;
  module: any;
  question: any;
  URL: any;
  userAnswer: any;
  answerRef: any;
  key: any
  answer: any;
  qustionID: any;
  currentTime: any;
  postedTime: any;
  duration: any;
  uid: any;
  postanswer: any;
  public answer_arr:Array<any>=[];
 


  public userid: any;
  public getUserID: any;
  public quizRef: any;
  public fname:any;
  public imageURL:any;
  public userImage:any;
  public timeDuration:number;
  public roundTime:number;
  public inSeconds:number;
  public inMinutes:number;
  public inHours:number;
  public displayTime:number;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public Popctrl: PopoverController,
    public toastCtrl: ToastController,
    public alert: AlertController,
    private db: AngularFireDatabase,
    private modelCtrl: ModalController,) {




  }

  ionViewDidLoad() {
    this.data = this.navParams.get('data');
    this.quizRef = this.navParams.get('quizRef');
    this.key = this.navParams.get('key');
    console.log(" ref:" + this.quizRef);
    console.log("mm key:" + this.key);

    this.title = this.data.title;
    this.module = this.data.module;
    this.question = this.data.question;
    this.URL = this.data.URL;
    this.postedTime = this.data.postedTime;
    this.key = this.data.$key;
    this.uid = this.data.uid;
    this.postanswer = this.data.answer;
    this.fname=this.data.fname;
    this.imageURL=this.data.imageURL;

    console.log(this.data);

    console.log("key is" + this.key);

    this.initializeRef();
    this.initializeAnswer();

    var date = new Date();
    this.currentTime = date.getTime();
    this.timeDuration=(this.currentTime-this.postedTime)/1000;
    console.log("posted time"+this.timeDuration);
     
    this.roundTime=Math.round(this.timeDuration)
    console.log("round time"+this.roundTime);

    if(this.roundTime>3600){
      this.inHours=this.roundTime/3600;
      this.displayTime=this.inHours;

    }
   else if(this.roundTime>60){
      this.inMinutes=this.roundTime/60;
      this.displayTime=this.inMinutes;
    }
    else{
      this.inSeconds=this.roundTime;
      this.displayTime=this.inSeconds;
    }



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

  initializeAnswer(){
  

    this.db.list(this.answerRef).subscribe(data => {
      this.answer_arr = data;    
      this.answer_arr.map(item => {
        
        console.log(this.answer_arr);
        //this.test.push(item.$key);
       // console.log("test is"+this.test);
        // console.log("item is:"+item.$key);
      })
      
      
  });

  
  }

  // presentTost() {
  //   let toast = this.toastCtrl.create({
  //     message: 'please enter the answer',
  //     duration: 5000
  //   });
  //   toast.present();
  // }

  // Alertsuccessfull() {
  //   let alertmsg = this.alert.create({
  //     title: 'Successful',
  //     message: 'You post the Answer successfully',
  //     buttons: ['Ok']
  //   });
  //   alertmsg.present(alertmsg);
  // }

  // AlertNotSuccessfull() {
  //   let alertmsg = this.alert.create({
  //     title: 'Error',
  //     message: 'Something wrong happen',
  //     buttons: ['Ok']
  //   });
  //   alertmsg.present(alertmsg);
  // }




 

  postAnswerpage(key) {
    let openAnswerModulePage = this.modelCtrl.create(PostAnswerPage,{key});
    openAnswerModulePage.present();
  }


}
