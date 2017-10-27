import { Component, ViewChild, NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events, LoadingController } from 'ionic-angular';
import { ChatProvider } from "../../providers/chat/chat";

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import firebase from 'firebase';
import { ImageHanderProvider } from "../../providers/image-hander/image-hander";
/**
 * Generated class for the BuddychatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild('content') content: Content;
  buddy: any;
  newmessage;
  allmessages: FirebaseListObservable<any>;
  array_allmessage = [];
  photoURL;
  imgornot;
  constructor(
    public imageHander : ImageHanderProvider,
    public loading: LoadingController,
    public zone: NgZone, private event: Events, public angularDatabae: AngularFireDatabase,
    public chatProvider: ChatProvider,
    public navCtrl: NavController, public navParams: NavParams) {
    this.buddy = this.chatProvider.buddy;
    this.photoURL = firebase.auth().currentUser.photoURL;
    this.scrollto();
    // this.getbuddymessage();
    this.event.subscribe('newmessage', () => {
      // this.allmessages = [];
      this.imgornot = [];
      this.zone.run(() => {
        this.allmessages = this.chatProvider.buddymessages;
        this.allmessages.subscribe(data=>{
          for(var key in data){
            if(data[key].message.substring(0,4) == 'http'){
              this.imgornot.push(true);
            }else{
              this.imgornot.push(false);
            }
          }
        })
      })
    })
  }

  addmessage() {
    this.chatProvider.addmessage(this.newmessage).then(() => {
      this.content.scrollToBottom();
      this.newmessage = '';
    })
  }
  ionViewDidEnter() {
    this.chatProvider.getbuddymessage();
  }
  scrollto() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000);
  }
  sendpicturemsg(){
    let loader = this.loading.create({
      content:"please wait..."
    });
    loader.present();
    this.imageHander.picmsgstore().then((imgurl)=>{
      loader.dismiss();
      this.chatProvider.addmessage(imgurl).then(()=>{
        this.content.scrollToBottom();
        this.newmessage = '';
      })
    }).catch(err=>{
      alert(err);
      loader.dismiss();
    })
  }


}
