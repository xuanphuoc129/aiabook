import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  newuser = {
    email: '',
    password: '',
    displayName: ''
  }
  constructor(
    public geolocation: Geolocation,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public userProvider: UserProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }


  goback() {
    this.navCtrl.setRoot('LoginPage');
  }
  signup() {
    var toast = this.toastCtrl.create({
      duration: 2000,
      position: 'bottom'
    });
    if (this.newuser.email == '' || this.newuser.password == '' || this.newuser.displayName == '') {
      toast.setMessage('All fields are required dude');
      toast.present();
    } else if (this.newuser.password.length < 7) {
      toast.setMessage('Password is not strong. Try giving more than six characters');
      toast.present();
    } else {
      let loader = this.loadingCtrl.create({
        content: 'Please wait..',
        duration: 2000
      });
      loader.present();
      this.userProvider.addUser(this.newuser).then((res: any) => {
        // console.log("after");
        if (res.sucess) {
          this.setPosition().then((res: any) => {
            if (res.success) {
              alert('Cập nhật vị trí thành công')
            }
            this.navCtrl.setRoot('ProfilepicPage');
          })
        } else {
          alert('Error' + res);
          // loader.dismiss();
        }
      });
    }
  }
  setPosition() {
    var promise = new Promise((resolve) => {
      this.geolocation.getCurrentPosition().then(location => {
        var position = {
          lat: location.coords.latitude,
          lng: location.coords.longitude
        }
        this.userProvider.updatePosition(position).then((res : any) => {
          if (res.success) {
            resolve({ success: true });
          }else{
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
