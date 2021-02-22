import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  public goodsReturnUrl = "http://sys.senheng.com.my/shmanagement_apps/gr/"
  public staff_token: any;
  public options: any;
  public appId: any = "cc359c41-0349-4678-aa64-47e0ec9d6eca";
  public projectId: any = "1042599928422";

  constructor(public httpClient: HttpClient, public http: Http, public storage: Storage, public router: Router) {

  }

  async  apiLogin(username, password, deviceId) {
    return new Promise((resolve, reject) => {
      const actionName = "login.php";
      const data =
        '?username=' + username +
        '&password=' + password +
        '&device=' + deviceId
        ;
      console.log(this.goodsReturnUrl + actionName + data);
      this.http.post(this.goodsReturnUrl + actionName + data, '').subscribe(results => {

        resolve(results)

        console.log("apiLogin Success", results);
      }, error => {

        reject(error)
        console.log("apiLogin Error", error);
      })

    });
  }
  async logout() {
    this.storage.clear();
    this.router.navigateByUrl("", { replaceUrl: true })
  }
}
