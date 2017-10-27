import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, App, AlertController } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";
import { ImageHanderProvider } from "../../providers/image-hander/image-hander";

import firebase from 'firebase';
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  avatar: string;
  displayName: string;
  constructor(
    public loading: LoadingController,
    public imagehander: ImageHanderProvider,
    public appctrl: App,
    public alertctrl: AlertController,
    public userServie: UserProvider,
    public zone: NgZone,
    public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewWillEnter() {
    this.loadUserDetail();
  }
  loadUserDetail() {
    this.userServie.getUserDetails().then((res: any) => {
      this.displayName = res.displayName;
      this.zone.run(() => {
        this.avatar = res.photoURL;
        // document.getElementById('bg').style.backgroundImage = this.avatar;
      })
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  updateAddress() {
    this.navCtrl.push('AddressPage',{key: 1});
  }
  updateFavoriteBook() {
    this.navCtrl.push('BookFavoritePage',{key: 1});
  }
  viewAbout() {

  }
  report(){

  }
  goToFanpage() {

  }
  updateDisplayName() {
    let statusalert = this.alertctrl.create({
      buttons: ['Okay']
    });
    let alert = this.alertctrl.create({
      title: 'Edit Nick name',
      inputs: [{
        name: 'nickname',
        placeholder: ' Nick name'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {

        }
      }, {
        text: 'Edit',
        handler: data => {
          if (data.nickname) {
            this.userServie.updateDisplayName(data.nickname).then((res: any) => {
              if (res.success) {

                statusalert.setTitle('Updated');
                statusalert.setSubTitle('Your nick name has bean changed successfully!');
                statusalert.present();
                this.zone.run(() => {
                  this.displayName = data.nickname;
                })
              } else {
                statusalert.setTitle('Failed');
                statusalert.setSubTitle('Your nick name was not changed successfully!');
                statusalert.present();
              }
            })
          }
        }
      }]
    })
    alert.present();
  }
  updateProfileImage() {
    let statusalert = this.alertctrl.create({
      buttons: ['Okay']
    });
    this.imagehander.uploadimage().then((url: any) => {
      this.userServie.updateImage(url).then((res: any) => {
        // loader.dismiss();
        if (res.success) {
          statusalert.setTitle('Updated');
          statusalert.setSubTitle('Your profile picture has bean changed successfully!');
          statusalert.present();

          this.zone.run(() => {
            this.avatar = url;
          })
        }
      }).catch((err) => {
        statusalert.setTitle('Failed');
        statusalert.setSubTitle('Your profile picture was not changed successfully!');
        statusalert.present();
      })
    }).catch(err => {
      // loader.dismiss();
    })
  }
  signout() {
    firebase.auth().signOut().then(() => {
      alert('You logged out');
      this.appctrl.getRootNav().setRoot('LoginPage');
    })
  }
}
