import { ServerService } from './server.service';
import { Component } from '@angular/core';
// import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public staff_token: any = '';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    public ss: ServerService,
    public router: Router,
    // public oneSignal: OneSignal,
    public storage: Storage
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initializeStorage()
    });
  }

  initializeStorage() {
    this.storage.ready().then(() => {

      this.storage.get('staff_token')
        .then(val => {
          this.staff_token = val
          console.log("StaffToken ===>  " + this.staff_token)
          if (val == null || val == undefined || val == '') {
            this.router.navigateByUrl("/login", { replaceUrl: true })
          } else {
            this.router.navigateByUrl("/list", { replaceUrl: true })
          }
        }).catch(err => {
          console.log("StaffToken ===>  " + err)
        })

    });
  }
}
