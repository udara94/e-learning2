import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  firedata = firebase.database().ref('/Users');

  constructor() {
    //console.log('Hello UserProvider Provider');
  }

  getuserdetails(){
    var promise=new Promise((resolve,reject)=>{
      this.firedata.child(firebase.auth().currentUser.uid).once('value',(snapshot)=>{
        resolve(snapshot.val());
    }).catch((err)=>{
      reject(err);
    })
  })
  return promise;

}
}