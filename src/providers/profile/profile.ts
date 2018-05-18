//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {Reference} from '@firebase/database-types';
import {User,AuthCredential} from '@firebase/auth-types';
/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {

  user: Reference;
  currentUser: User;
  userid:any;

  constructor() {
    
    firebase.auth().onAuthStateChanged(user=>{
      if (user){
        this.currentUser=user;
      // this.user=firebase.database().ref('/user/${user.uid}');
       this.user=firebase.database().ref('user/'+firebase.auth().currentUser.uid);
       //console.log("current user: "+this.user);
      // this.userid=firebase.auth().currentUser.uid;
    //this.user=firebase.database().ref('user/'+this.userid)
      }
    });
    console.log("testing :"+this.user);
  }

  getUserProfile():Reference{
    return this.user;
  }
}
