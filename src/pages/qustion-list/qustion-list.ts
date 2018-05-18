import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, Item } from 'ionic-angular';
import { QuesionsPage } from '../quesions/quesions';
import { AnswersPage } from '../answers/answers';
import { AngularFireDatabase, FirebaseListObservable, DATABASE_PROVIDERS } from 'angularfire2/database-deprecated';
import { SelectSearchable } from 'ionic-select-searchable';
import firebase from 'firebase';
//import { ProfileProvider } from '../../providers/profile/profile';



@Component({
  selector: 'page-qustion-list',
  templateUrl: 'qustion-list.html',
})
export class QustionListPage {

  //questions: FirebaseListObservable<any>;

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modelCtrl: ModalController,
    private db: AngularFireDatabase,
    public loadingCtrl: LoadingController) {

     

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


    this.db.list('IT').subscribe(data => {
      this.test = data;    
      this.test.map(item => {
        
        //this.test.push(item.$key);
       //console.log("uid is"+item.uid);

       
       //this.user=firebase.database().ref('user/'+item.uid);
      // console.log("userImage is:"+this.userImage);
      // if(item.uid==this.user){
     //  this.userImage=firebase.database().ref('user/'+item.uid+'/imageURL/');
      // }


      })
      
  });

  }



  // ITquestions(){
  //   this.quizRef = firebase.database().ref('/IT');
  //   this.quizRef.on('value',itemSnapshot=>{
  //     this.questions =[];
  //     itemSnapshot.forEach(itemsnapshot => {
  //       this.questions.push(itemsnapshot.val());
        
  //       return false;      
  //     });
  
  //   })
  // }
  // ENquestions(){
  //   this.quizRef = firebase.database().ref('/Engineer');
  //   this.quizRef.on('value',itemSnapshot=>{
  //     this.questions =[];
  //     itemSnapshot.forEach(itemsnapshot => {
  //       this.questions.push(itemsnapshot.val());
        
  //       return false;      
  //     });
  
  //   })
  // }
  // BMquestions(){
  //   this.quizRef = firebase.database().ref('/Business');
  //   this.quizRef.on('value',itemSnapshot=>{
  //     this.questions =[];
  //     itemSnapshot.forEach(itemsnapshot => {
  //       this.questions.push(itemsnapshot.val());
        
  //       return false;      
  //     });
  
  //   })
  // }



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
  ionViewDidLoad(){

    this.getQuestions();   
    
    console.log("uid:"+this.imageURL);
 
  }
  

  addQuestions() {
    let openQuestionPage = this.modelCtrl.create(QuesionsPage);
    openQuestionPage.present();

  }

  provideAnswers(question) {
    this.navCtrl.push(AnswersPage,{data:question});
    
  }
}
