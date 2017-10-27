import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserProvider {
  firedata = firebase.database().ref('/users');
  constructor(public angularAuth: AngularFireAuth) {
    console.log('Hello UserProvider Provider');
  }
  checkSignUp() {
    var promise = new Promise((resolve) => {
      this.getalluser().then((res: any) => {
        var alluser = [];
        alluser = res;
        let check: boolean = false;
        var uid = firebase.auth().currentUser.uid;
        for (var i in alluser) {
          if (alluser[i].uid == uid) {
            check = true;
          }
        }
        if (check) {
          resolve({ check: true });
        } else {
          resolve({ check: false });
        }
      })
    })
    return promise;
  }
  addSocialUser() {
    var promise = new Promise((resolve) => {
      this.firedata.child(this.angularAuth.auth.currentUser.uid).set({
        uid: this.angularAuth.auth.currentUser.uid,
        displayName: this.angularAuth.auth.currentUser.displayName,
        photoURL: this.angularAuth.auth.currentUser.photoURL,
        position: "",
        address: "",
        bookfavorite: "",
        booklend: "",
        bookread: ""
      }).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        alert(err);
      })
    })
    return promise;
  }
  addUser(newuser) {
    var promise = new Promise((resolve) => {
      this.angularAuth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
        this.angularAuth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,
          photoURL: 'https://firebasestorage.googleapis.com/v0/b/gatfirebase.appspot.com/o/profile.png?alt=media&token=e2fe66c6-b14b-49db-9482-133dfac54c80 '
        }).then(() => {
          this.firedata.child(this.angularAuth.auth.currentUser.uid).set({
            uid: this.angularAuth.auth.currentUser.uid,
            displayName: newuser.displayName,
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/gatfirebase.appspot.com/o/profile.png?alt=media&token=e2fe66c6-b14b-49db-9482-133dfac54c80 ',
            position: "",
            address: "",
            bookfavorite: "",
            booklend: "",
            bookread: ""
          }).then(() => {
            resolve({ sucess: true });
          }).catch((err) => {
            resolve({ sucess: false });
          })
        }).catch((err) => {
          alert(err);
        })
      }).catch((err) => {
        alert(err);
      })
    });
    return promise;
  }
  passwordreset(email) {
    var promise = new Promise((resolve) => {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        resolve({ sucess: true });
      }).catch((err) => {
        alert(err);
      })
    })
    return promise;
  }

  updateImage(imgUrl) {
    // console.log(imgUrl);
    var promise = new Promise((resolve) => {
      this.angularAuth.auth.currentUser.updateProfile({
        displayName: this.angularAuth.auth.currentUser.displayName,
        photoURL: imgUrl
      }).then(() => {
        this.getUserDetails().then((user: any) => {
          console.log(user);
          this.firedata.child(firebase.auth().currentUser.uid).update({
            displayName: user.displayName,
            photoURL: imgUrl,
            uid: user.uid,
            position: user.position,
            address: user.address,
            booklend: user.booklend,
            bookread: user.bookread,
            bookfavorite: user.bookfavorite,
          }).then(() => {
            resolve({ success: true });
          }).catch(err => alert(err))
        })
      }).catch((err) => {
        alert(err);
      })
    })
    return promise;
  }
  getUserDetails() {
    var promise = new Promise((resolve) => {
      firebase.database().ref('/users/' + firebase.auth().currentUser.uid).once('value', (snapshot) => {
        resolve(snapshot.val());
      }).catch((err) => {
        alert(err);
      })
    })
    return promise;
  }
  updateBookLend(newBookID) {
    var promise = new Promise((resolve) => {
      this.getUserDetails().then((user: any) => {
        var booklend = user.booklend;
        booklend.push(newBookID);
        this.firedata.child(firebase.auth().currentUser.uid).update({
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          position: user.position,
          address: user.address,
          booklend: booklend,
          bookread: user.bookread,
          bookfavorite: user.bookfavorite,
        }).then(() => {
          resolve({ success: true });
        }).catch(err => alert(err))
      })
    })
    return promise;

  }
  updateBookRead(newBookID) {
    var promise = new Promise((resolve) => {
      this.getUserDetails().then((user: any) => {
        var bookread = user.bookread;
        bookread.push(newBookID);
        this.firedata.child(firebase.auth().currentUser.uid).update({
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          position: user.position,
          address: user.address,
          booklend: user.booklend,
          bookread: bookread,
          bookfavorite: user.bookfavorite,
        }).then(() => {
          resolve({ success: true });
        }).catch(err => alert(err))
      })
    })
    return promise;

  }
  updateBookFavorite(newbookfavorite) {
    var promise = new Promise((resolve) => {
      this.getUserDetails().then((user: any) => {
        this.firedata.child(firebase.auth().currentUser.uid).update({
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          position: user.position,
          address: user.address,
          booklend: user.booklend,
          bookread: user.bookread,
          bookfavorite: newbookfavorite,
        }).then(() => {
          resolve({ success: true });

        }).catch(err => alert(err))
      })
    })
    return promise;

  }
  updatePosition(newposition) {
    var promise = new Promise((resolve) => {
      this.getUserDetails().then((user: any) => {
        console.log(user);

        this.firedata.child(firebase.auth().currentUser.uid).update({
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          position: newposition,
          address: user.address,
          booklend: user.booklend,
          bookread: user.bookread,
          bookfavorite: user.bookfavorite,
        }).then(() => {
          resolve({ success: true });
        }).catch((err) => {
          console.log(err);
          alert(err);
        })
      })
    })
    return promise;

  }
  updateAddress(newaddress) {
    var promise = new Promise((resolve) => {
      this.getUserDetails().then((user: any) => {
        this.firedata.child(firebase.auth().currentUser.uid).update({
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          position: user.position,
          address: newaddress,
          booklend: user.booklend,
          bookread: user.bookread,
          bookfavorite: user.bookfavorite,
        }).then((succ) => {
          resolve({ success: true });
        }).catch(err => alert(err))
      })
    })
    return promise;

  }
  updateDisplayName(newname) {
    var promise = new Promise((resolve) => {
      this.angularAuth.auth.currentUser.updateProfile({
        displayName: newname,
        photoURL: this.angularAuth.auth.currentUser.photoURL
      }).then(() => {
        this.getUserDetails().then((user: any) => {
          this.firedata.child(firebase.auth().currentUser.uid).update({
            displayName: newname,
            photoURL: user.photoURL,
            uid: user.uid,
            position: user.position,
            address: user.address,
            booklend: user.booklend,
            bookread: user.bookread,
            bookfavorite: user.bookfavorite,
          }).then(() => {
            resolve({ success: true });
          }).catch(err => alert(err))
        }).catch((err) => {
          alert(err);
        })
      }).catch((err) => {
        alert(err);
      })
    })
    return promise;
  }
  getalluser() {
    var promise = new Promise((resolve) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        alert(err);
      })
    })
    return promise;
  }

}
