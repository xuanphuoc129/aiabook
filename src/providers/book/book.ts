import { Injectable } from '@angular/core';

import firebase from 'firebase';
import { UserProvider } from "../user/user";
import { BookAndUser } from "../../model/interfaces/bookanduser";
import {AngularFireDatabase} from 'angularfire2/database';
/*
  Generated class for the BookProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class BookProvider {
  firedata =  firebase.database().ref('/bookanduser');
  
  constructor(
    public database: AngularFireDatabase,
    public userProvider : UserProvider) {
  }

  addToBookAndUser(credit: BookAndUser){
    var promise =  new Promise((resolve)=>{
        this.firedata.push({
          uid : firebase.auth().currentUser.uid,
          bookid: credit.bookid,
          quantity: credit.quantity,
          type: credit.type
        }).then(()=>{
          resolve({success:true});
        }).catch((err)=>{
          alert(err);
        })
    })
    return promise;
  }
  userGetBookRead(){
    var promise = new Promise((resolve)=>{
      this.database.list('/bookanduser',{preserveSnapshot:true,query:{
        orderByChild:'type',
        equalTo:'reading'
      }}).subscribe(data=>{
        var readinglist = [];
        data.forEach((snapshot)=>{
          if(snapshot.val().uid== firebase.auth().currentUser.uid){
            readinglist.push(snapshot.val());
          }
        })
        resolve(readinglist);
      })
    })
    return promise;
  }
  userGetBookLend(){
    var promise = new Promise((resolve)=>{
      this.database.list('/bookanduser',{preserveSnapshot:true,query:{
        orderByChild:'type',
        equalTo:'lend'
      }}).subscribe(data=>{
        var lendlist = [];
        data.forEach((snapshot)=>{
          if(snapshot.val().uid== firebase.auth().currentUser.uid){
            lendlist.push(snapshot.val());
          }
        })
        resolve(lendlist);
      })
    })
    return promise;
  }
  userVote(bookid,score){
    var promise = new Promise((resolve)=>{
      firebase.database().ref('/vote').child(bookid).set({
          uid: firebase.auth().currentUser.uid,
          vote: score
      }).then(()=>{
        resolve({success: true});
      }).catch((err)=>{
        alert(err);
      })
    })
    return promise;
  }
  getVote(bookid){
    let data; 
    firebase.database().ref('/vote').child(bookid).once('value', snapshot=>{
      var score = 0;
      data = snapshot.val();
      for (var key in data) {
        score +=data[key].vote;
      }
      return (score/data.length);

    }).catch((err)=>{
      return 0;
    })
  }
  
}
