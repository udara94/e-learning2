import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login';

import {AngularFireAuth} from 'angularfire2/auth';
import { timer } from 'rxjs/observable/timer';
//import { StatusBar } from '@ionic-native/status-bar';
import { SelectSearchable } from 'ionic-select-searchable';
import {TabsPage} from '../pages/tabs/tabs';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
   showSplash = true;


   

   portChange(event: { component: SelectSearchable, value: any }) {
       console.log('port:', event.value);
   }

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private afAuth: AngularFireAuth) {
      this.afAuth.authState.subscribe(auth =>{
        if(!auth)
        this.rootPage=LoginPage;
        else
        this.rootPage=TabsPage;
      });
      
      platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      timer(3000).subscribe(() => this.showSplash = false)
    });

  }

  /* initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();  // <-- hide static image

       // <-- hide animation after 3s
    });
  }*/

}

