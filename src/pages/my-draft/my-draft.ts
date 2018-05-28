import { Component,ViewChild } from '@angular/core';
import {  NavController,Content, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import firebase from 'firebase';
import {QuesionsPage} from '../quesions/quesions';

/**
 * Generated class for the MyDraftPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-my-draft',
  templateUrl: 'my-draft.html',
})
export class MyDraftPage {

  @ViewChild(Content) content: Content;

  public draft:any;
  public myId:any;
  public MyDraft_arry: Array<any> = [];
  public userid:any;
  public getUserID:any;
  public draftRef:any;
  public draftList:any;
  public length:number;
  public number:number=2;
  showMe =false;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public loadingCtrl:LoadingController,
     public db: AngularFireDatabase,
    public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyDraftPage');
    this.initializeDraftRef();
    this.getMyDraft();
    
  }



  getMyDraft(){

    this.draft = this.db.list(this.draftRef);
    console.log("draftref :"+this.draftRef);

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.myId = firebase.auth().currentUser.uid;

    console.log("myId: "+this.myId);
    this.draft.subscribe(events => {

      let event = events;

      this.MyDraft_arry = event;

      console.log("key is:" + events.$key);

      let myevent = events
      loading.dismiss();
      this.MyDraft_arry = myevent.filter(event => {
        console.log("UID: " + event.uid);
        this.length=this.MyDraft_arry.length;
        console.log("number of drafts: "+this.length); 
        return event.uid == this.myId;
        

      });
      

    })
   
  }

  scrollToTop() {
    if(this.content.scrollTop==0){
      this.showMe=false;
    }
    else if(this.content.scrollTop>56){
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
 

  initializeDraftRef(){
    this.userid = firebase.auth().currentUser.email;
    console.log("userID: " + this.userid);
    this.userid = firebase.auth().currentUser.email;
    this.getUserID = this.userid.slice(0, -19);
    console.log("field is :" + this.getUserID);
    // this.selectFeild();
    if (this.getUserID == "en" || this.getUserID == "En" || this.getUserID == "EN" || this.getUserID == "eN") {
      this.draftRef = firebase.database().ref('/Draft/EN');
    }
    else if (this.getUserID == "bm" || this.getUserID == "Bm" || this.getUserID == "BM" || this.getUserID == "bM") {
      this.draftRef = firebase.database().ref('/Draft/BM');
    }
    else if (this.getUserID == "it" || this.getUserID == "It" || this.getUserID == "IT" || this.getUserID == "iT") {
      this.draftRef = firebase.database().ref('/Draft/IT');
    }
    console.log("dtabase: " + this.draftRef);
  }

  deleteMyDraft(myDraft){
    var query=this.draftRef.orderByKey().equalTo(myDraft);
    query.once('value',draftSnapshot=>{
      this.draftList=[];
      draftSnapshot.forEach(snapshot => {
        snapshot.ref.remove();
        console.log("draft deleted");
        return false;
      });
    });
  }

  deleteAll(){
    this.userid = firebase.auth().currentUser.uid;
    var query=this.draftRef.orderByChild('uid').equalTo(this.userid);
    query.once('value', draftSnapshot=>{
      this.draftList=[];
      draftSnapshot.forEach(snapshot => {
        snapshot.ref.remove();
        console.log("All draft deleted");
        return false;
      });
    })
  }

  deleteAlert(){
    let prompt = this.alertCtrl.create({
      title: 'Delete all drafts?',
      message: 'You can swipe to delete individually',
      buttons: [
      {
        
        text: "Cancel",
        handler: data =>{
        console.log("Cancle clicked");
        }
        
      },{
        
        text: "Delete All",
        handler: data =>{
      this.deleteAll();
        }
        
      }
     ]
    });
    prompt.present();
  }

  viewdraft(draft,number){
    number=this.number;
    console.log("draft page number is"+number);
    this.navCtrl.push(QuesionsPage,{draft,number})
  }
}
