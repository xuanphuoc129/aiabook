import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFireAuth } from 'angularfire2/auth';
import { UserCredit } from '../../model/interfaces/usercredit';

import { Facebook } from '@ionic-native/facebook';

import firebae from 'firebase';
import { LoadingController } from "ionic-angular";

@Injectable()
export class AuthProvider {

  constructor(
    public facebook: Facebook,
    public angularAuth: AngularFireAuth,
  ) {
    console.log('Hello AuthProvider Provider');
  }

  login(creditical: UserCredit) {
    var promise = new Promise((resolve) => {
      this.angularAuth.auth.signInWithEmailAndPassword(creditical.email, creditical.password).then(() => {
        resolve(true);
      }).catch((err) => {
        alert(err);
      });
    });
    return promise;
  }
  loginFacebook() {
    var promise = new Promise((resolve) => {
      this.facebook.login(['email']).then(res => {
        console.log(res);
        this.angularAuth.auth.signInWithCredential(firebae.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)).then((rs) => {
          resolve(true);
        }).catch((err) => {
          alert(err);
        })
      }).catch(err => {
        alert(err);
      })

    })
    return promise;
  }

}
