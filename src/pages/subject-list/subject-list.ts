import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import {AngularFireDatabase,AngularFireList,FirebaseListObservable } from 'angularfire2/database';
import {QuesionsPage} from '../quesions/quesions'
import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database-deprecated';
/**
 * Generated class for the SubjectListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-subject-list',
  templateUrl: 'subject-list.html',
})
export class SubjectListPage {

  subject :string="";
  sub;
  subjects: FirebaseListObservable<any>;
  subName='';

  constructor(public db: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams) {


    this.subject = this.navParams.get('subject');

    this.db.list('/IT').subscribe(suject=>{
      console.log("subject"+suject);
    });
    


    /* this.db.list("/subjects/").subscribe(_data =>{
       this.subjects= _data;
     }
     );*/

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubjectListPage');
    
    
  }

  add(){
    this.db.list('/subjects').push({
      subject:this.subject   
    })
   
  
  }

  addQuestion(subName){

    this.navCtrl.push(QuesionsPage,{subName:this.subName});
  }

}
