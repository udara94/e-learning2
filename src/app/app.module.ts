import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//import { AppComponent } from './app.component';

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
import {ForgotPasswordPage} from '../pages/forgot-password/forgot-password';
import {MyQuestionPage} from '../pages/my-question/my-question';
import {UpdatePostPage} from '../pages/update-post/update-post';
import {PostAnswerPage} from '../pages/post-answer/post-answer';
import {CommentsPage} from '../pages/comments/comments';
import {TabsPage} from '../pages/tabs/tabs';
import {EventModelPage} from '../pages/event-model/event-model';
import {MyDraftPage} from '../pages/my-draft/my-draft';
import {RewardsPage} from '../pages/rewards/rewards';


import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database-deprecated';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UserProvider } from '../providers/user/user';
import { ProfileProvider } from '../providers/profile/profile';
import { DataProvider } from '../providers/data/data';
import { QuestionProvider } from '../providers/question/question';
import {NgCalendarModule} from 'ionic2-calendar';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ReferenceProvider } from '../providers/reference/reference';
import {SearchPipe} from '../pipes/search/search';
import {SortPipe} from '../pipes/sort/sort';



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
    SearchModulePage,
    ForgotPasswordPage,
    MyQuestionPage,
    UpdatePostPage,
    PostAnswerPage,
    CommentsPage,
    TabsPage,
    EventModelPage,
    MyDraftPage,
    RewardsPage,
    SearchPipe,
    SortPipe
  
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SelectSearchableModule,
    NgCalendarModule,
    RoundProgressModule,
    NgCircleProgressModule.forRoot({radius: 100,outerStrokeWidth: 16,innerStrokeWidth: 8,outerStrokeColor: "#78C000",innerStrokeColor: "#C7E596",animationDuration: 300,
      
    })
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
    SearchModulePage,
    ForgotPasswordPage,
    MyQuestionPage,
    UpdatePostPage,
    PostAnswerPage,
    CommentsPage,
    TabsPage,
    EventModelPage,
    MyDraftPage,
    RewardsPage
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    UserProvider,
    ProfileProvider,
    DataProvider,
    QuestionProvider,
    ReferenceProvider
  ]
})
export class AppModule {}
