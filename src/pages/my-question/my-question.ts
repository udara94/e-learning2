import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,ModalController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import firebase from 'firebase';
import {UpdatePostPage} from '../update-post/update-post'


@Component({
  selector: 'page-my-question',
  templateUrl: 'my-question.html',
})
export class MyQuestionPage {

user:string;
questionList:any;
public module:any;
public title:any;
public question:any;
qu: FirebaseListObservable<any>;
arrData=[];
userid:any;
getUserID:any;
quizRef:any;
public toUpdatePage:number;


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public af:AngularFireDatabase,
    public alert:AlertController,
  public db:AngularFireDatabase,
  public modelCtrl:ModalController) {

      /*this.db.list('/Question/').subscribe( _data=>{
        this.arrData=_data;
      })*/
      this.getMyQuestion();
      this.toUpdatePage=1;
 
  }

  getMyQuestion(){

    firebase.auth().onAuthStateChanged(user=>{

      if(user){

        this.user=user.uid;
        this.initializeRef();
        
        var query=this.quizRef.orderByChild('uid').equalTo(this.user);
        query.once('value' ,questionListSnapshot =>{

          this.questionList =[];
       
          questionListSnapshot.forEach(snapshot=>{
            this.questionList.push({

            module:snapshot.val().module,
            title:snapshot.val().title,
            question:snapshot.val().question

            })
            console.log("question list:"+this.questionList)

            return false;
          })
        })
      }
    });
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

  updateQuestion(myQuestion,toUpdatePage) {
    let openSearchModulePage = this.modelCtrl.create(UpdatePostPage,{data:myQuestion,toUpdatePage});
    openSearchModulePage.present();
  }

  
  /*deleteNurse(bookID):void{
    let prompt = this.alert.create({
      title: 'Delete contact',
      
      buttons: [
      {
        
        text: "Cancel",
        handler: data =>{
        console.log("Cancle clicked");
        }
        
      },{
        
        text: "Delete contact",
        handler: data =>{
          
        this.qu.remove(bookID);
        }
        
      }
     ]
    });
    prompt.present();
  }*/
  deleteQuestion(question){
    var query= this.quizRef.orderByChild('title').equalTo(question);
    query.once('value', questionSnapshot=>{
      
      this.questionList=[];
      questionSnapshot.forEach(snapshot=>{
        snapshot.ref.remove();
        console.log("question deleted");
        return false;
      });
      this.getMyQuestion();

    });
   
  }


  onclick(){
    console.log("module"+this.module);
    console.log("title"+this.title);
    console.log("question"+this.question);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyQuestionPage');
  }

}
