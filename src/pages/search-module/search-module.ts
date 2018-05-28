import { Component,ViewChild, OnInit, ElementRef } from '@angular/core';
import { NavController, NavParams,ViewController,Content ,Scroll } from 'ionic-angular';
import { SelectSearchable } from 'ionic-select-searchable';
import firebase from 'firebase';
import { QuesionsPage } from '../quesions/quesions';
import {UpdatePostPage} from '../update-post/update-post';
//import {SearchPipe} '../../pipes/search/search';


@Component({
  selector: 'page-search-module',
  templateUrl: 'search-module.html',

})
export class SearchModulePage  {

  @ViewChild(Content) content: Content;

  descending: boolean = false;
order: number;
column: string = 'name';
public ionScroll;
public showButton = false;
public contentData = [];
  

  public countryList: Array<any>;
  public loadedCountryList: Array<any>;
  public countryRef: firebase.database.Reference;

  public selectedModule: any;
  public search: any = "";
  public searchModule: any = "";
  showMe =false;
  public count:number;
  public toUpdatePage:number;
  public userid:any;
  public getUserID:any;
  public moduleRef:any;
  public number:number=1;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public myElement: ElementRef) {

  }

 

  initializeRef() {

    this.userid = firebase.auth().currentUser.email;
    console.log("userID: " + this.userid);
    this.userid = firebase.auth().currentUser.email;
    this.getUserID = this.userid.slice(0, -19);
    console.log("field is :" + this.getUserID);
    // this.selectFeild();
    if (this.getUserID == "en" || this.getUserID == "En" || this.getUserID == "EN" || this.getUserID == "eN") {
      this.moduleRef = firebase.database().ref('/enModule');
    }
    else if (this.getUserID == "bm" || this.getUserID == "Bm" || this.getUserID == "BM" || this.getUserID == "bM") {
      this.moduleRef = firebase.database().ref('/bmModule');
    }
    else if (this.getUserID == "it" || this.getUserID == "It" || this.getUserID == "IT" || this.getUserID == "iT") {
      this.moduleRef = firebase.database().ref('/itmodule');
    }
    console.log("dtabase: " + this.moduleRef);

  }

  // ngOnInit() {
  //   // Ionic scroll element
  //   this.ionScroll = this.myElement.nativeElement.children[1].firstChild;
  //   // On scroll function
  //   this.ionScroll.addEventListener("scroll", () => {
  //     if (this.ionScroll.scrollTop > window.innerHeight) {
  //       console.log("xxxxxxxxxxx:"+this.ionScroll);
  //       console.log("yyyyyyy:"+this.ionScroll.scrollTop);
        
  //       this.showButton = true;
  //       console.log("showMe: "+this.showButton);
  //     } else {
  //       this.showButton = false;
  //     }
  //   });
  //   // Content data
  //   for (let i = 0; i < 301; i++) {
  //     this.contentData.push(i);
  //   }
  // }

  // scrollToTop(scrollDuration) {
  //   let scrollStep = -this.ionScroll.scrollTop / (scrollDuration / 15);
  //   let scrollInterval = setInterval( () => {
  //       if ( this.ionScroll.scrollTop != 0 ) {
  //           this.ionScroll.scrollTop = this.ionScroll.scrollTop + scrollStep;
  //       } else {
  //         clearInterval(scrollInterval);
  //       }
  //   }, 15);
  // }

  sort(){
   this.descending=!this.descending;
   this.order=this.descending ? 1: -1; 
  }

  // initializeItems(): void {
  //   this.countryList = this.loadedCountryList;
  // }

  // getItems(searchbar) {
  //   // Reset items back to all of the items
  //   this.initializeItems();


  //   // set q to the value of the searchbar
  //   var q = searchbar.srcElement.value;


  //   // if the value is an empty string don't filter the items
  //   if (!q) {
  //     return;
  //   }

  //   this.countryList = this.countryList.filter((v) => {
  //     if (v.name && q) {
  //       if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
  //         return true;
  //       }
  //       return false;
  //     }
  //   });
  //   console.log(q, this.countryList.length);


  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchModulePage');
    this.initializeRef();
    this.countryRef = this.moduleRef;

    this.countryRef.on('value', countryList => {
      let countries = [];
      countryList.forEach(country => {
        countries.push(country.val());
        return false;
      });

      this.countryList = countries;
      this.loadedCountryList = countries;
    });

   

  
  }

  getTheModule(module) {
    this.selectedModule = module;
    console.log(module);
    //this.passModule(this.searchModule);
    //this.close();
  }


  passModule(selectedModule,number) {
    this.viewCtrl.dismiss();
    number=this.number;
    console.log("search number is"+number)
    this.navCtrl.push(QuesionsPage, { selectedModule,number});
    
  }

  scrollToTop() {
    if(this.content.scrollTop==0){
      this.showMe=false;
    }
    else if(this.content.scrollTop>50){
      this.showMe=true;
    }


  }

  scroll(){
    this.content.scrollToTop();
  }

  onScroll(event){
console.log("fffff:"+event);
this.scrollToTop();

  }



  close() {
    this.navCtrl.pop();
  }
}
