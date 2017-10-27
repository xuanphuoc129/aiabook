import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";
import { ImageHanderProvider } from "../../providers/image-hander/image-hander";

import firebase from 'firebase';
/**
 * Generated class for the ProfilepicPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profilepic',
  templateUrl: 'profilepic.html',
})
export class ProfilepicPage {
  photoURL = firebase.auth().currentUser.photoURL;
  moveon = true;
  constructor(
    public loadCtrl: LoadingController,
    public userServie : UserProvider,
    public zone: NgZone,
    public imgservice: ImageHanderProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilepicPage');
  }
  chooseImage(){
    let loader = this.loadCtrl.create({
      content:'Please wait..'
    });
    loader.present();
    this.imgservice.uploadimage().then((uploadedImageUrl : any)=>{
      loader.dismiss();
      this.zone.run(()=>{
        this.photoURL = uploadedImageUrl;
        this.moveon = false;  
      })
    }).catch((err)=>{
      alert(err);
    })
  }
  updateprocess(){
    let loader = this.loadCtrl.create({
      content:'Please wait..'
    });
    loader.present();
    this.userServie.updateImage(this.photoURL).then((res: any)=>{
      loader.dismiss();
      if(res.success){
        this.navCtrl.setRoot('AddressPage');
      }else{
        alert(res);
      }
    })
  }
  process(){
    this.navCtrl.setRoot('AddressPage');
  }
}
