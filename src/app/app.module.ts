import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {SignupPage} from '../pages/signup/signup';
import {SubjectListPage} from '../pages/subject-list/subject-list';
import {QuesionsPage} from '../pages/quesions/quesions';
import {PopOverPage} from '../pages/pop-over/pop-over';
import {AnswersPage} from '../pages/answers/answers';
import {HelpDeskPage} from '../pages/help-desk/help-desk';
import {QustionListPage} from '../pages/qustion-list/qustion-list';
import {ProfilePage} from '../pages/profile/profile';
import {EditProfilePage} from '../pages/edit-profile/edit-profile';
import {SettingsPage} from '../pages/settings/settings';
import {SearchModulePage} from '../pages/search-module/search-module';
//import {ForgotPasswordPage} from '../pages/forgot-password/forgot-password';

import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database-deprecated';
import { SelectSearchableModule } from 'ionic-select-searchable';



var config={
    apiKey: "AIzaSyBhjMAHUxADe_f3ls-QU2fS1BTiC4d6e3U",
    authDomain: "cpmad-83d5d.firebaseapp.com",
    databaseURL: "https://cpmad-83d5d.firebaseio.com",
    projectId: "cpmad-83d5d",
    storageBucket: "cpmad-83d5d.appspot.com",
    messagingSenderId: "478124167816"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    SubjectListPage,
    QuesionsPage,
    PopOverPage,
    AnswersPage,
    HelpDeskPage,
    QustionListPage,
    ProfilePage,
    EditProfilePage,
    SettingsPage,
    SearchModulePage
  
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SelectSearchableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    SubjectListPage,
    QuesionsPage,
    PopOverPage,
    AnswersPage,
    HelpDeskPage,
    QustionListPage,
    ProfilePage,
    EditProfilePage,
    SettingsPage,
    SearchModulePage
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
