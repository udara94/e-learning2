//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {Reference} from '@firebase/database-types';

/*
  Generated class for the ReferenceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReferenceProvider {

 public userid:any;
 public getUserID:any;
 public quizRef:any;
 public questionRef:any;
 public draftRef:any;

  constructor() {
    console.log('Hello ReferenceProvider Provider');
  }


  UpdatepostRef(){

    this.userid = firebase.auth().currentUser.email;
    console.log("userID: " + this.userid);
    this.userid = firebase.auth().currentUser.email;
    this.getUserID = this.userid.slice(0, -19);
    console.log("field is :" + this.getUserID);
    if (this.getUserID == "en" || this.getUserID == "En" || this.getUserID == "EN" || this.getUserID == "eN") {
      this.quizRef = firebase.database().ref('/Engineer/');
    }
    else if (this.getUserID == "bm" || this.getUserID == "Bm" || this.getUserID == "BM" || this.getUserID == "bM") {
      this.quizRef = firebase.database().ref('/Business/');
    }
    else if (this.getUserID == "it" || this.getUserID == "It" || this.getUserID == "IT" || this.getUserID == "iT") {
      this.quizRef = firebase.database().ref('/IT/');
    }
    console.log("dtabase: " + this.quizRef);
  
    return this.quizRef;
  }

  


}
