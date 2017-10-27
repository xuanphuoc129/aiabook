import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { UserCredit } from '../../model/interfaces/usercredit';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from "../tabs/tabs";
import { UserProvider } from "../../providers/user/user";
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  creditical = {} as UserCredit;
  constructor(
    public userProvider: UserProvider, public geolocation: Geolocation,
    public authProvider: AuthProvider, public loading: LoadingController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signin() {
    this.authProvider.login(this.creditical).then((res: any) => {
      if (!res.code) {
        this.navCtrl.setRoot('TabsPage');
      } else {
        alert(res);
      }
    })
  }
  signup() {
    this.navCtrl.push('SignupPage');
  }
  passwordreset() {
    this.navCtrl.push('PasswordresetPage');
  }
  signinfacebook() {
    let loader = this.loading.create({
      content: 'Please wait..',
      duration: 3000
    });
    loader.present();
    this.authProvider.loginFacebook().then((res: any) => {
      if (!res.code) {
        this.userProvider.checkSignUp().then((res: any) => {
          if (res.check) {
            this.navCtrl.setRoot('TabsPage');
          } else {
            this.userProvider.addSocialUser().then((res: any) => {
              if (res.success) {
                this.setPosition().then((result: any) => {
                  this.navCtrl.setRoot('ProfilepicPage');
                })
              } else {
                alert(res);
              }
            }).catch((err) => {
              alert(err);
            })
          }
        }).catch((err) => {
          alert(err);
        })
      } else {
        alert(res);
      }
    }).catch((err) => {
      alert(err);
    })
  }
  setPosition() {
    var promise = new Promise((resolve) => {
      this.geolocation.getCurrentPosition().then(location => {
        var position = {
          lat: location.coords.latitude,
          lng: location.coords.longitude
        }
        this.userProvider.updatePosition(position).then((res: any) => {
          if (res.success) {
            resolve({ success: true });
          } else {
            alert(res);
          }
        });
      }).catch((err) => {
        alert(err);
      })
    })
    return promise;
  }
}
