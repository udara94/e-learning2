import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Item } from 'ionic-angular';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  
  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }


 /* qustionref = firebase.database().ref('/Users');
  removeQuestion(item: Item){
    return this.qustionref.remove(item.key);
  }*/

}
