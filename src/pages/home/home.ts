import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { SubjectListPage } from '../subject-list/subject-list';
import { QuesionsPage } from '../quesions/quesions';
import { AnswersPage } from '../answers/answers';
import { QustionListPage } from '../qustion-list/qustion-list';
import { HelpDeskPage } from '../help-desk/help-desk';
import { PopoverController } from 'ionic-angular';
import { PopOverPage } from '../pop-over/pop-over';
import { ProfilePage } from '../profile/profile';
import {MyQuestionPage} from '../my-question/my-question';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


public moduleRef:any;
public model:any;
  constructor(public Popctrl: PopoverController,
    public navCtrl: NavController,
    private fire: AngularFireAuth) {


  }



   presentPopover(myEvent) {
    let popover = this.Popctrl.create(PopOverPage);
    popover.present({
      ev: myEvent
    });
  }



  questions(){
    this.navCtrl.push(QustionListPage);
  }

  myQuestions(){
    this.navCtrl.push(MyQuestionPage);
  }

  subjectlist(){
    this.navCtrl.push(SubjectListPage);
  }

  addQuestion() {

    this.moduleRef = firebase.database().ref('/bmModule');
  
         this.moduleRef.push({
          module: this.model,
      
        });
        console.log(this.model);

      }
}
