import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the PasswordresetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage {
  email: string;
  constructor(
    public alertCtrl :AlertController,
    public userProvider : UserProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad PasswordresetPage');
  }
  goback() {
    this.navCtrl.setRoot('LoginPage');
  }
  reset(){
    let alert = this.alertCtrl.create({
      buttons: ['Ok']
    });
    this.userProvider.passwordreset(this.email).then((res: any)=>{
      if(res.sucess){
        alert.setTitle('Email sent');
        alert.setSubTitle('Please follow the instruction in the email to reset your password');
        alert.present();
      }else{
        alert.setTitle('Failed');
      }
    })
  }
}
