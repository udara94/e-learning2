import { Component,ViewChild } from '@angular/core';
import { NavController,Content ,NavParams, AlertController, ToastController, ModalController, ViewController, LoadingController } from 'ionic-angular';
import { AnswersPage } from '../answers/answers';
import { HelpDeskPage } from '../help-desk/help-desk';
import { SearchModulePage } from '../search-module/search-module';
import { SelectSearchable } from 'ionic-select-searchable';
import firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ProfileProvider } from '../../providers/profile/profile';


@Component({
  selector: 'page-quesions',
  templateUrl: 'quesions.html',
})
export class QuesionsPage {

  @ViewChild(Content) content: Content;


  search: any = "";
  question: string = "";
  module: string = "";
  title: string = "";
  testing: string = "";
  modules: FirebaseListObservable<any>;
  searchModule: any = "";
  selectedModule: any = "";
  myStuff: any;
  captureDataUrl: string="";
  URL: string="";
  public currentUser: any;
  questionRef:any;
  userid:any;
  public quizRef : firebase.database.Reference =firebase.database().ref('/user');
  public questions:Array<any>=[];
  public userProfile: any;
  public imageURL="";
  public myDate: number;
  public postedTime:any;
  public getUserID:any;
  public selectedQuestionRef:any;
  public draftRef:any;
  public draft:any;
  public fname:any;
  public number:number=1;
  


  

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase,
    private alert: AlertController,
    private toastCtrl: ToastController,
    private modelCtrl: ModalController,
    private viewCtrl: ViewController,
    private camera: Camera,
    private loadCtrl: LoadingController,
    public ProfileProvider: ProfileProvider,
  ) {
    
 
  

    

  }

  ionViewDidLoad() {
    this.number=1
    this.selectedModule = this.navParams.get('selectedModule');
    this.draft = this.navParams.get('draft');
    this.number=this.navParams.get('number');
    console.log("draftddddddddddd:"+this.number);

    this.title = "";
    this.question = "";
    this.search = "";

   // this.alert = alert;

    var date = new Date(); // Or the date you'd like converted.
    this.myDate = date.getTime() 
   this.postedTime=this.myDate;
    console.log("time:"+date.getTime());

    console.log('ionViewDidLoad QuesionsPage');
    if(this.number==1){
      console.log("number is aaaaaaaaaaaaaaaaaaaaaaa:"+this.number)
      this.search = this.selectedModule;
    }
    else if(this.number==2){
      console.log("number is aaaaaaaaaaaaaaaaaaaaaa:"+this.number)
      this.search=this.draft.module;
      this.title=this.draft.title;
      this.question=this.draft.question;
    }
    

    this.ProfileProvider.getUserProfile().on('value', userProfileSnapshot => {

      this.userProfile = userProfileSnapshot.val();

   
      this.imageURL=this.userProfile.imageURL;

      if(this.imageURL==""){
        this.imageURL="https://firebasestorage.googleapis.com/v0/b/cpmad-83d5d.appspot.com/o/images%2FUser_icon_BLACK-01.png?alt=media&token=1e171c21-b6fd-405c-b409-97ad6b4b1e26";
        console.log("no profile picture");
      }
     

      console.log("profile picture:"+this.imageURL);
    });

    this.initializeRef();
    this.initializeDraftRef();
                      
    // this.questionRef=this.ref.initializeRef();
    // this.draftRef=this.ref.initializeDraftRef();
  
  }


  initializeRef() {

    this.userid = firebase.auth().currentUser.email;
    console.log("userID: " + this.userid);
    this.userid = firebase.auth().currentUser.email;
    this.getUserID = this.userid.slice(0, -19);
    console.log("field is :" + this.getUserID);
    // this.selectFeild();
    if (this.getUserID == "en" || this.getUserID == "En" || this.getUserID == "EN" || this.getUserID == "eN") {
      this.questionRef = firebase.database().ref('/Engineer');
    }
    else if (this.getUserID == "bm" || this.getUserID == "Bm" || this.getUserID == "BM" || this.getUserID == "bM") {
      this.questionRef = firebase.database().ref('/Business');
    }
    else if (this.getUserID == "it" || this.getUserID == "It" || this.getUserID == "IT" || this.getUserID == "iT") {
      this.questionRef = firebase.database().ref('/IT');
    }
    console.log("dtabase: " + this.questionRef);

   

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
 



  capture() {
    //setup camera options
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE

    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
      this.URL = this.captureDataUrl;
    }, (err) => {
      console.log("ERROR -> " + JSON.stringify(err));
    });

  }

  loadFromLibrary() {
    let options = {
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
      this.URL = this.captureDataUrl;
    }, (err) => {
      console.log("ERROR -> " + JSON.stringify(err));
    });

  }


  upload() {
    
    let storageRef = firebase.storage().ref();
    // this.countryRef = firebase.database().ref('/countries');
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);
    


    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {

     // this.showSuccesfulUploadAlert();
    });
  }


  // presentLoadingDefault() {
  //   let loading = this.loadCtrl.create({
  //     content: 'Please wait...'
  //   });

  //   loading.present();

  //   setTimeout(() => {
  //     loading.dismiss();
  //  }, 3000);
  // }

  // showSuccesfulUploadAlert() {
  //   let alert = this.alert.create({
  //     title: 'Uploaded!',
  //     subTitle: 'Picture is uploaded to Firebase',
  //     buttons: ['OK']
  //   });
  //   alert.present();

  //   // clear the previous photo data in the variable
  //   this.captureDataUrl = "";
  // }

  protected adjustTextarea(event: any): void {
    let textarea: any = event.target;
    textarea.style.overflow = 'hidden';
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    return;
  }


  addQuestion() {

    this.fname=this.userProfile.fname;

    if (this.title == "" || this.question == "") {
      this.presentTost();
    }
    else {
      try {
        this.userid=firebase.auth().currentUser.uid;

       this.selectedQuestionRef= this.questionRef;
        var key = this.questionRef.push({
          module: this.search,
          question: this.question,
          title: this.title,
          uid:this.userid,
          URL:this.URL,
          imageURL:this.imageURL,
          postedTime:this.postedTime,
          fname:this.fname,
          
        }).key;

        console.log("key is: "+key);
      
        if(this.URL==""){
            console.log("no url");
        }
     else{
        this.upload();
     }
      
       
        this.Alertsuccessfull();
        //this.close();
        this.viewCtrl.dismiss();
      } catch{
        this.AlertNotSuccessfull();
      }
    }
  }

addDraft(){
    this.userid=firebase.auth().currentUser.uid;

     //this.selectedQuestionRef= this.questionRef;
     this.draftRef.push({
        module: this.search,
        question: this.question,
        title: this.title,
        uid:this.userid,
   
      });
      let draftToast = this.toastCtrl.create({
        message: 'Question Saved as Draft',
        duration: 3000
      });
      draftToast.present();
  
}


  addSearchPage() {
    this.viewCtrl.dismiss();
    let openSearchModulePage = this.modelCtrl.create(SearchModulePage);
    openSearchModulePage.present();
  }

  enterModule() {
    this.db.list('/countries').push({
      name: this.testing,
    })
  }


  Alertsuccessfull() {
    let alertmsg = this.alert.create({
      title: 'Successful',
      message: 'You post the question successfully',
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

  presentTost() {
    let toast = this.toastCtrl.create({
      message: 'please insert the question and the title',
      duration: 5000
    });
    toast.present();
  }



  answers() {
    this.navCtrl.push(AnswersPage);
  }

  helpDesk() {
    this.navCtrl.push(HelpDeskPage);
  }

  close() {
    if(this.number==1){
      console.log("what is the number"+this.number);
      this.addDraft();
      this.navCtrl.pop();
      
    }
    else if(this.number==2){
      this.navCtrl.pop();
    }

    else{
      this.navCtrl.pop();
    }
    
  }


}
