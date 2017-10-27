import { Injectable } from '@angular/core';
import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
import { Events } from 'ionic-angular';
import firebase from 'firebase';
/*
  Generated class for the ChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ChatProvider {
  buddymessages : FirebaseListObservable<any>;
  firebuddychats = firebase.database().ref('/buddychats'); 
  buddy: any;
  constructor(private event: Events,public angularDatabae: AngularFireDatabase) {
    console.log('Hello ChatProvider Provider');
  }
  initializebuddy(buddy) {
    this.buddy = buddy;
  }
  addmessage(msg){
    if(this.buddy){
      var promise = new Promise((resolve)=>{
        this.firebuddychats.child(firebase.auth().currentUser.uid).child(this.buddy.uid).push({
          sentby: firebase.auth().currentUser.uid,
          message: msg,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(()=>{
          this.firebuddychats.child(this.buddy.uid).child(firebase.auth().currentUser.uid).push({
            sentby: firebase.auth().currentUser.uid,
            message: msg,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          }).then(()=>{
            resolve(true);
          }).catch((err)=>{
            resolve(err);
          })
        })
      })
      return promise;
    }
  }
  getbuddymessage() {
    console.log(firebase.auth().currentUser);
    this.buddymessages = this.angularDatabae.list('/buddychats/' + firebase.auth().currentUser.uid + '/' + this.buddy.uid);
    this.event.publish('newmessage');
  }
  // getbuddymessage(){
  //   let temp;
  //   this.firebuddychats.child(firebase.auth().currentUser.uid).child(this.buddy.uid).once('value',(snapshot)=>{
  //     this.buddymessages = [];
  //     temp = snapshot.val();
  //     for (var i in temp) {
  //      this.buddymessages.push(temp[i]);
  //     }
  //     this.event.publish('newmessage');
  //   })
  // }
}
