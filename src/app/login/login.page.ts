import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController, Platform, ToastController } from '@ionic/angular';
import { ServerService } from '../server.service';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public username: any = "";
  public password: any = "";
  public toast: any;
  public loginData: any;
  loginData2: any;
  parseData: any;
  constructor(
    public navCtrl: NavController,
    public router: Router,
    public storage: Storage,
    public ss: ServerService,
    public plt: Platform,
    public uniqueDeviceID: UniqueDeviceID,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController
  ) {
    this.menuCtrl.enable(false);
  }
  ngOnInit() {
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  login() {
    if (this.plt.is('cordova')) {
      this.uniqueDeviceID.get()
        .then((uuid: any) => {
          console.log("Device ID " + uuid)
          // let uuid = '02cf978b-99dc-0a0f-3867-486045539999'
          this.ss.apiLogin(this.username, this.password, uuid).then(data => {
            this.loginData = data;
            this.loginData2 = this.loginData._body;
            this.parseData = JSON.parse(this.loginData2)


            const StaffId = this.parseData.data.staff_id;
            this.storage.set('staff_id', StaffId);
            const StaffToken = this.parseData.data.staff_token;
            this.storage.set('staff_token', StaffToken);

            console.log("LoginData ===> ", this.parseData)
            if (this.parseData.status == "1") {
              this.toastSuccess(this.parseData.message);
              this.navCtrl.navigateRoot(["/list"])
            } else {
              this.toastDanger(this.parseData.message);
            }
          }).catch(error => {
            console.log("LoginData Error===>  " + error.message)
          })
        }
        ).catch((error: any) => console.log("Device ID error " + error));
    } else {
      let uuid = '02cf978b-99dc-0a0f-3867-486045539999'
      this.ss.apiLogin(this.username, this.password, uuid).then(data => {
        this.loginData = data;
        this.loginData2 = this.loginData._body;
        this.parseData = JSON.parse(this.loginData2)


        const StaffId = this.parseData.data.staff_id;
        this.storage.set('staff_id', StaffId);
        const StaffToken = this.parseData.data.staff_token;
        this.storage.set('staff_token', StaffToken);

        console.log("LoginData ===> ", this.parseData)
        if (this.parseData.status == "1") {
          this.toastSuccess(this.parseData.message);
          this.navCtrl.navigateRoot(["/list"])
        } else {
          this.toastDanger(this.parseData.message);
        }
      }).catch(error => {
        console.log("LoginData Error===>  " + error.message)
      })
    }

  }

  toastSuccess(message) {
    this.toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: 'success'
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }
  toastDanger(message) {
    this.toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: 'danger'
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }


}
