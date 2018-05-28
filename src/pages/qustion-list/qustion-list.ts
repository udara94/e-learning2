import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,Content, ModalController, LoadingController, Item } from 'ionic-angular';
import { QuesionsPage } from '../quesions/quesions';
import { AnswersPage } from '../answers/answers';
import { CommentsPage } from '../comments/comments';
import { AngularFireDatabase, FirebaseListObservable, DATABASE_PROVIDERS } from 'angularfire2/database-deprecated';
import { SelectSearchable } from 'ionic-select-searchable';
import firebase from 'firebase';
//import { ProfileProvider } from '../../providers/profile/profile';
import { timer } from 'rxjs/observable/timer';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  selector: 'page-qustion-list',
  templateUrl: 'qustion-list.html',
})
export class QustionListPage {

  //questions: FirebaseListObservable<any>;

  @ViewChild(Content) content: Content;

  public countryList: Array<any>;
  public loadedCountryList: Array<any>;
  public countryRef: firebase.database.Reference;
  public quizRef : any;
  //firebase.database.Reference =firebase.database().ref('/Question');
  public keyID:any;
  public uniqKeyID:any;
 public questions:Array<any>=[];

  public userProfile: any;
  public imageURL:any;
  public userid:any;
  public getUserID:any;
  public questionRef:any;
  public test:Array<any>=[];
  public userImage:any;
  public user:any;
  public comments:any;
  public answerarr:Array<any>=[];
  public buttonClicked:boolean=false;
  showMe =false;
  showSplash = true;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modelCtrl: ModalController,
    private db: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    platform: Platform,
     statusBar: StatusBar, 
     splashScreen: SplashScreen) {

    

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
ionViewDidLoad(){

  this.getQuestions();   
  
  console.log("uid:"+this.imageURL);

}

  initializeItems(): void {
    this.questions = this.loadedCountryList;
  }

  initializeQuiz()
  {
    this.initializeRef();

    // this.quizRef.on('value',itemSnapshot=>{
    //   this.questions =[];
    //   itemSnapshot.forEach(itemsnapshot => {
        
    //     this.keyID= this.questions.push(itemsnapshot.$key);
    //     console.log("qustion:"+this.questions)
    //     console.log("key:"+itemsnapshot.$key);
    //     console.log("keyID:"+this.keyID);

       
    //     return false;      
    //   });
  
    // })


    this.db.list(this.quizRef).subscribe(data => {
      this.test = data;  
      console.log("question legnth:"+this.test.length)  
     
      this.test.map(item => {
        console.log("question:"+item)
        
        //this.test.push(item.$key);
       console.log("key"+item.$key);

     
   this.comments=this.db.list(this.quizRef+item.$key+'/answer/').subscribe(answerdata=>{
        this.answerarr=answerdata;
        this.answerarr.map(item=>{
           console.log("answerarr:"+this.answerarr);
           console.log("path:"+this.db.list(this.quizRef+item.$key+'/answer/'));
        })
      });
       //this.user=firebase.database().ref('user/'+item.uid);
      // console.log("userImage is:"+this.userImage);
      // if(item.uid==this.user){
     //  this.userImage=firebase.database().ref('user/'+item.uid+'/imageURL/');
      // }


      })
      
  });

 

  }

  initializeAnswer(){

  }

  dispalyCardContent(question){
    
    this.buttonClicked= !this.buttonClicked;
  }

  scrollToTop() {
    if(this.content.scrollTop==0){
      this.showMe=false;
    }
    else if(this.content.scrollTop>10){
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



  


  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.questions = this.questions.filter((v) => {
      if (v.question && q) {
        if (v.question.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.questions.length);

  }
getQuestions(){


  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  loading.present();

  this.initializeQuiz()

  this.quizRef.on('value', questions => {
    let countries = [];
   loading.dismiss();
    questions.forEach(country => {
      
      countries.push(country.val());
      
      return false;
    });
  //  console.log("countries :"+countries);
    this.questions = countries;
    //console.log("this is question :"+questions);
    this.loadedCountryList = countries;
  });
  

}

refreshQuestions(){
 
  this.initializeQuiz()

  this.quizRef.on('value', questions => {
    let countries = [];
    
    questions.forEach(country => {
      
      countries.push(country.val());
      
      return false;
    });
  //  console.log("countries :"+countries);
    this.questions = countries;
    //console.log("this is question :"+questions);
    this.loadedCountryList = countries;
  });
  
}



doRefresh(refresher) {
  console.log('Begin async operation', refresher);
this.refreshQuestions();
  setTimeout(() => {
    console.log('Async operation has ended');
    refresher.complete();
  }, 2000);
}
  
  

  addQuestions() {
    let openQuestionPage = this.modelCtrl.create(QuesionsPage);
    openQuestionPage.present();

  }

  addcomments(question) {
    let openCommentPage = this.modelCtrl.create(CommentsPage,{data:question});
    openCommentPage.present();

  }

  provideAnswers(question) {
    this.navCtrl.push(AnswersPage,{data:question});
    
  }
}
