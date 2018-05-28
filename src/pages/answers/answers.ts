import { Component ,ViewChild} from '@angular/core';
import { NavController,ViewController, NavParams,Content, ToastController, AlertController,ModalController } from 'ionic-angular';
import { QuesionsPage } from '../quesions/quesions';
import { HelpDeskPage } from '../help-desk/help-desk';
import { PopoverController } from 'ionic-angular';
import { PopOverPage } from '../pop-over/pop-over';
import {PostAnswerPage} from '../post-answer/post-answer';
import {QustionListPage} from '../qustion-list/qustion-list';
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

  @ViewChild(Content) content: Content;


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
  duration: any;
  uid: any;
  postanswer: any;
  public answer_arr:Array<any>=[];
  public like_arr:Array<any>=[];
  public array:Array<any>=[];
  public testshow:any;
  
  
  


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
  public indays:number;
  public displayTime:number;
  public test:any;
  public showtime:any;
  public myDate: number;
  public postedTime:any;
  public answerTime:any;
  public currentAnswerTime:any;
  public answerTimeDuration:number;
  public answerRoundTime:number;
  public answeInSeconds:number;
  public answerInMinutes:number;
  public answerInHours:number;
  public answerDisplayTime:number;
  public answerTest:any;
  public answerShowtime:any;
  public length:any;
  public answerlabel:any;
  public number:number=1;
  public numberdata:any;
  public paraNum:number;
  public isVisible:boolean=false;
  public myId:any;
  showMe =false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public Popctrl: PopoverController,
    public toastCtrl: ToastController,
    public alert: AlertController,
    private db: AngularFireDatabase,
    private modelCtrl: ModalController,
    public viewCtrl: ViewController) {
      
     


  }

  ionViewDidLoad() {
   
    this.getdata();
    this.initializeRef();
    this.initializeAnswer();
    this.initializePostTime();
   



  }

  swipeEvent(e) {
    if (e.direction == 2) {
      //this.viewCtrl.dismiss();
      this.navCtrl.pop();
    }
    else if(e.direction ==4){
      this.navCtrl.push(PostAnswerPage);
    }
}

  getdata(){
    this.paraNum=this.navParams.get('number');

    this.number=this.paraNum;
    console.log("jjjjjjjjjjjjjjjjjjjjj:"+this.number)

    if(this.number==2){
      this.numberdata=this.navParams.get('myQuestion');

    this.title = this.numberdata.title;
    this.module = this.numberdata.module;
    this.question = this.numberdata.question;
    this.URL = this.numberdata.URL;
    this.postedTime = this.numberdata.postedTime;
    this.key = this.numberdata.$key;
    this.uid = this.numberdata.uid;
    this.postanswer = this.numberdata.answer;
    this.fname=this.numberdata.fname;
    this.imageURL=this.numberdata.imageURL;
    
    }
    else{
    this.data = this.navParams.get('data');
    this.quizRef = this.navParams.get('quizRef');
    this.key = this.navParams.get('key');
    console.log(" ref:" + this.quizRef);
    console.log("mm key:" + this.key);
    console.log("data:" + this.data);

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
    
   


    }

    this.setVisibleImage();

    
  }

  setVisibleImage(){
    if(this.URL==""){
      this.isVisible=this.isVisible;
    }
    else{
      this.isVisible=!this.isVisible;
    }
  }

  initializePostTime(){

  

      var date = new Date();
      this.currentTime = date.getTime();
      this.timeDuration=(this.currentTime-this.postedTime)/1000;
      console.log("posted time"+this.timeDuration);
       
      this.roundTime=Math.round(this.timeDuration)
      console.log("round time"+this.roundTime);
  
      if(this.roundTime>86400){
        this.indays=this.roundTime/86400
        this.displayTime=Math.round(this.indays);
        this.test=this.displayTime.toString();
        this.showtime=this.test+" days ago";
      }
     else if(this.roundTime>3600){
        this.inHours=this.roundTime/3600;
        this.displayTime=Math.round(this.inHours);
        this.test=this.displayTime.toString();
        this.showtime=this.test+" hour ago";
  
  
      }
     else if(this.roundTime>60){
        this.inMinutes=this.roundTime/60;
        this.displayTime=Math.round(this.inMinutes);
        this.test=this.displayTime.toString();
        this.showtime=this.test+" minutes ago";
      }
      else{
        this.inSeconds=this.roundTime;
        this.displayTime=Math.round(this.inSeconds);
        this.test=this.displayTime.toString();
        this.showtime=this.test+" seconds ago";
      }
      console.log("show time"+this.showtime);
 
   

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

  scrollToTop() {
    if(this.content.scrollTop==0){
      this.showMe=false;
    }
    else if(this.content.scrollTop>50){
      this.showMe=true;
    }


  }

  scroll(){
    this.content.scrollToTop();
  }

  onScroll(event){
console.log("fffff:"+event);
this.scrollToTop();

  }

  initializeAnswer(){
  

    this.db.list(this.answerRef).subscribe(data => {
     
     
      this.answer_arr = data; 
      this.answer_arr.map(item => {

      


          this.length=this.answer_arr.length;

       
          if(this.answer_arr.length==1){
           this.length=this.answer_arr.length;
           this.answerlabel="Answer";
         }
         else if(this.answer_arr.length>1){
           this.length=this.answer_arr.length;
           this.answerlabel="Answers";
         }
         else{
           this.length="No";
           this.answerlabel="Answers"
         }
 
        // console.log("answers:"+this.answerlabel);
        // console.log("length"+this.length);
        // console.log("posted time"+item.postedTime);
         
//    this.answer_arr.forEach(item => { 
 
//      var answerdate = new Date();
//      this.currentAnswerTime = answerdate.getTime();
//      this.answerTimeDuration=(this.currentAnswerTime-item.postedTime)/1000;
//      console.log("posted time"+this.answerTimeDuration);
      
//      this.answerRoundTime=Math.round(this.answerTimeDuration)
//      console.log("round time"+this.answerRoundTime);
 
     
//      if(this.answerRoundTime>3600){
//        this.answerInHours=this.answerRoundTime/3600;
//        this.answerDisplayTime=Math.round(this.answerInHours);
//        this.answerTest=this.answerDisplayTime.toString();
//        this.answerShowtime=this.answerTest+" hour ago";
       
 
//      }
//     else if(this.answerRoundTime>60){
//        this.answerInMinutes=this.answerRoundTime/60;
//        this.answerDisplayTime=Math.round(this.answerInMinutes);
//        this.answerTest=this.answerDisplayTime.toString();
//        this.answerShowtime=this.answerTest+" minutes ago";
//      }
//      else{
//        this.answeInSeconds=this.answerRoundTime;
//        this.answerDisplayTime=Math.round(this.answeInSeconds);
//        this.answerTest=this.answerDisplayTime.toString();
//        this.answerShowtime=this.answerTest+" seconds ago";
     
//    }
// this.testshow=this.answerShowtime
//   this.array.push(this.answerShowtime);
//   console.log("test show:"+this.testshow)
// });
        
  

      })
      
      
      
  });

  
  }

  postAnswerpage(key) {
    let openAnswerModulePage = this.modelCtrl.create(PostAnswerPage,{key});
    openAnswerModulePage.present();
  }


}
