import { Component,ViewChild } from '@angular/core';
import {  NavController,Content,ViewController, NavParams,ToastController } from 'ionic-angular';
import firebase from 'firebase';
import {ProfileProvider} from '../../providers/profile/profile';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';


/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {
  
  @ViewChild(Content) content: Content;

  public userid:any
  public getUserID: any;
  commentRef: any;
  fname:any;
  key: any;
  public userProfile: any;
  public imageURL="";
  public comment:any;
  public postedTime:any;
  public data:any;
  public myDate: number;
  public quizRef:any;
  public comment_arr:Array<any>=[];
  public buttonClicked:boolean=false;
  public uid:any;
  
  
  


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public ProfileProvider:ProfileProvider,
  public toastCtrl:ToastController,
  private db: AngularFireDatabase,
  public viewCtrl: ViewController) {

    var date = new Date();
  this.myDate = date.getTime() 
  this.postedTime=this.myDate;
  }

  protected adjustTextarea(event: any): void {
    let textarea: any = event.target;
    textarea.style.overflow = 'hidden';
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    return;
  }

  showSlider(){
    this.buttonClicked = !this.buttonClicked;
  }
  

  swipeEvent(e) {
    if (e.direction == 16) {
     // this.viewCtrl.dismiss();
      this.navCtrl.pop();
    }
  
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
    this.getData();
    this.initializeRef();
    this.initializeComment();
    
  }

  getData(){
    this.data = this.navParams.get('data');
    // this.quizRef = this.navParams.get('quizRef');
     //this.key = this.navParams.get('key');
    // this.fname=this.data.fname;
    // this.imageURL=this.data.imageURL;

   
 
     this.key = this.data.$key;
     console.log("key"+this.key)
     this.ProfileProvider.getUserProfile().on('value', userProfileSnapshot => {
 
       this.userProfile = userProfileSnapshot.val();
       this.fname=this.userProfile.fname;
       
      
       if(this.imageURL==""){
         this.imageURL="https://firebasestorage.googleapis.com/v0/b/cpmad-83d5d.appspot.com/o/images%2FUser_icon_BLACK-01.png?alt=media&token=1e171c21-b6fd-405c-b409-97ad6b4b1e26";
         console.log("no profile picture");
       }
       else{
        this.imageURL=this.userProfile.imageURL;
       }
     
     });

     

  }

  //this.sliceUser = this.currentUser.slice(0, -11);

  initializeComment(){
    this.db.list(this.commentRef).subscribe(data => {
    
      this.comment_arr = data;  

   
      this.comment_arr.map(item => {
      //  this.length=this.comment_arr.length;
     
      
      //  console.log("length"+this.length);
        console.log("posted time"+item.postedTime);
       
      })
      
      
      
  });
  }



  initializeRef() {

    this.userid = firebase.auth().currentUser.email;
    this.uid=firebase.auth().currentUser.uid;
    console.log("userID: " + this.uid);
    this.userid = firebase.auth().currentUser.email;
    this.getUserID = this.userid.slice(0, -19);
    console.log("field is :" + this.getUserID);
    // this.selectFeild();
    if (this.getUserID == "en" || this.getUserID == "En" || this.getUserID == "EN" || this.getUserID == "eN") {
      this.commentRef = firebase.database().ref('Engineer/' + this.key + '/comments/');
    }
    else if (this.getUserID == "bm" || this.getUserID == "Bm" || this.getUserID == "BM" || this.getUserID == "bM") {
      this.commentRef = firebase.database().ref('Business/' + this.key + '/comments/');
    }
    else if (this.getUserID == "it" || this.getUserID == "It" || this.getUserID == "IT" || this.getUserID == "iT") {
      this.commentRef = firebase.database().ref('IT/' + this.key + '/comments/');
    }
    console.log("dtabase: " + this.commentRef);

  }
  presentTost() {
    let toast = this.toastCtrl.create({
      message: 'please enter the comment',
      duration: 5000
    });
    toast.present();
  }

  addComments(stickers) {

    this.fname=this.userProfile.fname;

    if (this.comment == "") {
      this.presentTost();
    }
    else {
      try {
      
      
      //  this.answerRef = firebase.database().ref('IT/' + this.key + '/answer/');
        console.log("comment ref" + this.commentRef)
        console.log("userAnswer :"+this.comment)
        console.log("imageURL :"+this.imageURL)
        console.log("fname :"+this.fname)

        this.commentRef.push({

          userComment: this.comment,
          imageURL:this.imageURL,
          fname:this.fname,
          uid:this.uid
         // postedTime:this.postedTime,

        });

        

      } catch{
        console.log("error in comment");
      }
    }
  }



  close() {
    this.navCtrl.pop();
  }

}
