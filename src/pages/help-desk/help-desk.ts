import { Component } from '@angular/core';
import { NavController, AlertController,ViewController, NavParams, ModalController } from 'ionic-angular';
import { QuesionsPage } from '../quesions/quesions';
import { AnswersPage } from '../answers/answers';
import { PopoverController } from 'ionic-angular';
import { PopOverPage } from '../pop-over/pop-over';
import * as moment from 'moment';
import { EventModelPage } from '../event-model/event-model';
import firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';



@Component({
  selector: 'page-help-desk',
  templateUrl: 'help-desk.html',
})
export class HelpDeskPage {

  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  userid:any;
  getUserID :any;
  eventRef:any;
  events: FirebaseListObservable<any>;;
  eventArray:Array<any>=[];
  startTimeSlice:any;
  endTimeSlice:any;
  test:any;
  isAdmin:boolean=true;
  admin:any;

  calendar = {
    mode: 'month',
    currentDate: this.selectedDay

  }
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public Popctrl: PopoverController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
  public db:AngularFireDatabase,
  public viewCtrl:ViewController,) {
  }

  addEvent() {
    //this.viewCtrl.dismiss();
    let modal = this.modalCtrl.create(EventModelPage, { selectedDay: this.selectedDay });
    modal.present();

    modal.onDidDismiss(data => {
      // if (data) {
      //    let eventData = data;
      //    console.log("aaaaaaaaaaaa :"+data.startTime);

      //    eventData.startTime = new Date(data.startTime);
      //    eventData.endTime = new Date(data.endTime);

      //    console.log("eventData :"+eventData.startTime);
      //   let events = this.eventSource;
      //   events.push(eventData);
      //   this.eventSource = [];
      //   setTimeout(() => {
      //     this.eventSource = events;
      //   });
      // }
    })
  }

initializeAdmin(){
  this.admin = firebase.auth().currentUser.uid;
  console.log("admin:"+this.admin);
  if(this.admin=="Qor2x8QvAyNXNrrVmtgvrvlLktM2"||this.admin=="8Frc4JaHxffgNVVvQbKgnIN0bKC2"){
    this.isAdmin=this.isAdmin;
  }
  else{
    this.isAdmin=! this.isAdmin;
  }
}

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');

    
    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From' + start + '<br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }

  onEventChoose(item){
    let start = moment(item.startTime).format('LLLL');
    let end = moment(item.endTime).format('LLLL');
    let alert = this.alertCtrl.create({
      title: '' + item.title,
      subTitle: 'From' + start + '<br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }

  getevent(){
 

  this.db.list(this.eventRef).subscribe(data => {
     
    this.eventArray = data;  
    
 
    this.eventArray.map(item => {

      let eventdata=item;
      console.log("key:"+item.$key)

       eventdata.startTime = new Date(item.startTime);
      eventdata.endTime = new Date(item.endTime);

      
     let eventsitem = this.eventSource;
     this.eventArray.forEach(eventdata => {

      eventsitem.push(eventdata);
      this.eventSource = [];
      setTimeout(() => {
       this.eventSource = eventsitem;
      });
       
     });
            

    })
    
});


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpDeskPage');
    this.initializeRef();
   this.getevent();
   this.initializeAdmin();

  }
  initializeRef() {

    this.userid = firebase.auth().currentUser.email;
    console.log("userID: " + this.userid);
    this.userid = firebase.auth().currentUser.email;
    this.getUserID = this.userid.slice(0, -19);
    console.log("field is :" + this.getUserID);
    if (this.getUserID == "en" || this.getUserID == "En" || this.getUserID == "EN" || this.getUserID == "eN") {
      this.eventRef = firebase.database().ref('/Shedule/EN');
    }
    else if (this.getUserID == "bm" || this.getUserID == "Bm" || this.getUserID == "BM" || this.getUserID == "bM") {
      this.eventRef = firebase.database().ref('/Shedule/BM');
    }
    else if (this.getUserID == "it" || this.getUserID == "It" || this.getUserID == "IT" || this.getUserID == "iT") {
      this.eventRef = firebase.database().ref('/Shedule/IT');
    }
    console.log("dtabase: " + this.eventRef);
  
  }



}
