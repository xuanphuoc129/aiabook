import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {AngularFireDatabase} from 'angularfire2/database';
import { BookItems } from "../../model/class/bookitem";
/**
 * Generated class for the MorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {
  title: string;
  books = new Array<BookItems>();
  isLoading: boolean = true;
  constructor(
    public db: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.loadDatabase();
  }
  loadDatabase(){
    this.title = this.navParams.get('name');
    this.db.list('/'+this.title,{preserveSnapshot:true}).subscribe((list)=>{
      list.forEach((snapshot)=>{
        this.books.push(new BookItems(snapshot.val().bookID,snapshot.val().name,snapshot.val().photoUrl));
      })
      this.isLoading = false;
    })
  }
  viewBook(book){
    this.navCtrl.push('BookInfoPage',{book : book});
  }
}
