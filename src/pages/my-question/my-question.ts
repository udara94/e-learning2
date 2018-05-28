import { Component,ViewChild } from '@angular/core';
import { NavController,Content, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import firebase from 'firebase';
import { UpdatePostPage } from '../update-post/update-post'
import {AnswersPage} from '../answers/answers';

@Component({
  selector: 'page-my-question',
  templateUrl: 'my-question.html',
})
export class MyQuestionPage {

  @ViewChild(Content) content: Content;

  user: string;
  questionList: any;
  public module: any;
  public title: any;
  public question: any;
  qu: FirebaseListObservable<any>;
  arrData = [];
  userid: any;
  getUserID: any;
  quizRef: any;
  public myId: any;
  public toUpdatePage: number;
  public MyQuestio_arr: Array<any> = [];
  public myQuestion: any;
  showMe =false;
  public number:number=2;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public af: AngularFireDatabase,
    public alert: AlertController,
    public db: AngularFireDatabase,
    public modelCtrl: ModalController,
    public loadingCtrl: LoadingController) {


    // this.getMyQuestion();



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyQuestionPage');

    this.initializeRef();
    this.getMyQuestion();

  }

  getMyQuestion() {
    this.qu = this.db.list(this.quizRef);
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.myId = firebase.auth().currentUser.uid;


    this.qu.subscribe(events => {

      let event = events;

      this.MyQuestio_arr = event;

      console.log("key is:" + events.$key);

      let myevent = events
      loading.dismiss();
      this.MyQuestio_arr = myevent.filter(event => {
        console.log("UID" + event.uid);

        return event.uid == this.myId;


      });

    })
  }
  viewAnswer(myQuestion,number){
    number=this.number
    this.navCtrl.push(AnswersPage,{myQuestion,number})

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
  
  // getMyQuestion(){

  //   console.log("getting my question");
  //   firebase.auth().onAuthStateChanged(user=>{

  //     if(user){

  //       let loading = this.loadingCtrl.create({
  //         content: 'Please wait...'
  //       });

  //       loading.present();

  //       this.user=user.uid;

  //       this.initializeRef();

  //       var query=this.quizRef.orderByChild('uid').equalTo(this.user);
  //       query.once('value' ,questionListSnapshot =>{

  //         this.questionList =[];
  //         loading.dismiss();
  //         questionListSnapshot.forEach(snapshot=>{


  //           this.questionList.push({

  //           module:snapshot.val().module,
  //           title:snapshot.val().title,
  //           question:snapshot.val().question,
  //           key:snapshot.val().$key

  //           })

  //           console.log("question list:"+this.questionList)

  //           return false;
  //         })

  //       })
  //     }
  //   });
  // }

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

  updateQuestion(myQuestion) {

    let openSearchModulePage = this.modelCtrl.create(UpdatePostPage, { data: myQuestion });
    openSearchModulePage.present();
  }



  deleteQuestion(myQuestion) {
    var query = this.quizRef.orderByKey().equalTo(myQuestion);
    console.log("testingdddddd"+query)
    query.once('value', questionSnapshot => {

      this.questionList = [];
      questionSnapshot.forEach(snapshot => {
        snapshot.ref.remove();
        console.log("question deleted");
        return false;
      });
      // this.getMyQuestion();

    });

  }






}
