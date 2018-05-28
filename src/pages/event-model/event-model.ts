import { Component } from '@angular/core';
import { NavController, NavParams, ViewController ,ToastController,AlertController} from 'ionic-angular';
import * as moment from 'moment';
import firebase from 'firebase';
import {HelpDeskPage} from '../help-desk/help-desk';


@Component({
  selector: 'page-event-model',
  templateUrl: 'event-model.html',
})
export class EventModelPage {

  event={
    startTime:new Date().toISOString(),
    endTime:new Date().toISOString(),
    allDay:false,
    title:''
  }
  minDate =new Date().toISOString();
  sheduleRef:any;
  userid:any;
  getUserID:any
  scliceStartTime:any;
  scliceEndTime:any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
   public viewCtrl:ViewController,
   public toastCtrl:ToastController,
   public alertCtrl:AlertController
  ) {
  
  let preselectedDate=moment(this.navParams.get('selectedDay')).format();
  this.event.startTime=preselectedDate;
  this.event.endTime=preselectedDate
  }

  save(){
    console.log("abc: "+this.event.startTime);
     
  }

  addShedule(){
    if (this.event.title == "") {
      this.presentTost();
    }
    else {
      try {

        
        this.sheduleRef.push({
          title: this.event.title,
           startTime: this.event.startTime,
           endTime: this.event.endTime
          
        });
 
        this.Alertsuccessfull();
        this.viewCtrl.dismiss();
      } catch{
        this.AlertNotSuccessfull();
      }

    }

  }

  Alertsuccessfull() {
    let alertmsg = this.alertCtrl.create({
      title: 'Successful',
      message: 'You successfuly added an event',
      buttons: [{
        text:'Ok',
        handler:data=>{
          
         // this.navCtrl.push(HelpDeskPage);
        }
      }]
    });
    alertmsg.present(alertmsg);
  }

  AlertNotSuccessfull() {
    let alertmsg = this.alertCtrl.create({
      title: 'Error',
      message: 'Something wrong happen',
      buttons:['Ok']
    });
    alertmsg.present(alertmsg);
  }

  presentTost() {
    let toast = this.toastCtrl.create({
      message: 'please insert the name of the event',
      duration: 5000
    });
    toast.present();
  }



  initializeRef() {

    this.userid = firebase.auth().currentUser.email;
    console.log("userID: " + this.userid);
    this.userid = firebase.auth().currentUser.email;
    this.getUserID = this.userid.slice(0, -19);
    console.log("field is :" + this.getUserID);
    if (this.getUserID == "en" || this.getUserID == "En" || this.getUserID == "EN" || this.getUserID == "eN") {
      this.sheduleRef = firebase.database().ref('/Shedule/EN');
    }
    else if (this.getUserID == "bm" || this.getUserID == "Bm" || this.getUserID == "BM" || this.getUserID == "bM") {
      this.sheduleRef = firebase.database().ref('/Shedule/BM');
    }
    else if (this.getUserID == "it" || this.getUserID == "It" || this.getUserID == "IT" || this.getUserID == "iT") {
      this.sheduleRef = firebase.database().ref('/Shedule/IT');
    }
    console.log("dtabase: " + this.sheduleRef);
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventModelPage');
    this.initializeRef();
  }

  close() {
    this.navCtrl.pop();
  }

}
