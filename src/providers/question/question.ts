//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {Reference} from '@firebase/database-types';
import {User,AuthCredential} from '@firebase/auth-types';
/*
  Generated class for the QuestionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuestionProvider {

  question:Reference;

  constructor() {
    console.log('Hello QuestionProvider Provider');

    
  }

}
