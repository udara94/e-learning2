import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {ProfileProvider} from '../../providers/profile/profile';


/**
 * Generated class for the RewardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-rewards',
  templateUrl: 'rewards.html',
})
export class RewardsPage {

  public userProfile: any;
  public score:any;
  max=100
  current:any;
  displayFirstName:any;
  fname:any;
  levelScore:any;
  need:any;
  medalUrl:any;
  medalName:any;
  answered:any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    public ProfileProvider:ProfileProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RewardsPage');
    this.getRewardsDetails();
   
    
  }

  formatSubtitle = (percent: number) : string => {
    if(percent >= 100){
      return "Congratulations!"
    }else if(percent >= 50){
      return "Half"
    }else if(percent > 0){
      return "Just began"
    }else {
      return "Not started"
    }
  }
   

  getRewardsDetails(){
    this.ProfileProvider.getUserProfile().on('value',userProfileSnapshot=>{

      this.userProfile=userProfileSnapshot.val();
      this.fname = this.userProfile.fname;
      this.score=this.userProfile.points;
      console.log("score: "+this.score)
      console.log("name:"+this.displayFirstName)

      this.displayFirstName="Hello "+this.fname+" !";
      this.selectProgress();

    })
  }

  selectProgress(){

    this.answered=this.score/5;
console.log("my score:"+this.score);
console.log("answerd:"+this.answered);
    if(this.score=="0"){
      console.log("Im here")
      this.levelScore=100;
      this.need=this.levelScore-this.score;
      this.current=this.score;
    }
    else if(this.score <100){
      this.levelScore=100;
       this.need=this.levelScore-this.score;
       this.current=this.score;
       console.log("current score:"+this.current)
    }
    else if(this.score >=100 && this.score<200){
      this.levelScore=200;
      this.need=this.levelScore-this.score
      this.current=200-this.score;
      this.medalUrl="https://firebasestorage.googleapis.com/v0/b/cpmad-83d5d.appspot.com/o/bronze.png?alt=media&token=2e6a3236-53bc-4523-bb23-5e8aff4c0590"
      this.medalName="Bronze Medal";
    }
    else if(this.score >=200 && this.score<300){
      this.levelScore=300;
      this.need=this.levelScore-this.score
      this.current=300-this.score;
      this.medalUrl="https://firebasestorage.googleapis.com/v0/b/cpmad-83d5d.appspot.com/o/silvar.png?alt=media&token=4b11f4e8-ea12-45f3-8b46-8d1e2e386911"
      this.medalName="Silver Medal";
    }
    else if(this.score >=300 && this.score<400){
      this.levelScore=400;
      this.need=this.levelScore-this.score
      this.current=400-this.score;
      this.medalUrl="https://firebasestorage.googleapis.com/v0/b/cpmad-83d5d.appspot.com/o/gold.png?alt=media&token=fb07ec9d-4290-4e62-b7fe-6f18a537129b"
      this.medalName="Gold Medal";
    }
  }
}
