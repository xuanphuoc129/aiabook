import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides } from 'ionic-angular';

import firebase from 'firebase';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";

import { BookItems } from '../../model/class/bookitem';
import { DataProvider } from "../../providers/data";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  segment_container = 'home';
  isLoading: boolean = true;
  slides = [];
  imgUrl= '';
  newBookList = new Array<BookItems>();
  twenty_book = new Array<BookItems>();
  accounts: FirebaseListObservable<any>;
  types: any = [];
  constructor(
    public dataProvider : DataProvider,
    public angularFireDatabase: AngularFireDatabase,
    public navCtrl: NavController) {

  }
  ionViewDidLoad() {
    this.angularFireDatabase.list('/slides', { preserveSnapshot: true }).subscribe(data => {
      data.forEach(snapshot => {
        this.slides.push(snapshot.val().photoUrl);
      });
      this.isLoading = false;
    });
    // console.log(this.types);
  }
  viewBookInfo(book){
    this.navCtrl.push('BookInfoPage',{book : book});
  }
  ngOnInit() {
    this.accounts = this.angularFireDatabase.list('/twenty-book', { preserveSnapshot: true, query:{
      limitToFirst:10
    } });
    this.accounts.subscribe(data => {
      data.forEach(snapshot => {
        this.newBookList.push(new BookItems(snapshot.val().bookID,snapshot.val().name, snapshot.val().photoUrl));
      });
    });
    this.angularFireDatabase.list('/twenty-book', { preserveSnapshot: true ,query:{
      limitToFirst :10
    }}).subscribe(data => {
      data.forEach(snapshot => {
        this.twenty_book.push(new BookItems(snapshot.val().bookID,snapshot.val().name, snapshot.val().photoUrl));
      });
    })
    this.getData();
    

  }
  viewMore(name){
    this.navCtrl.push('MorePage',{name:name});
  }
  getData(){
    this.dataProvider.loadData().subscribe(data=>{
      this.types =  data.list;
    });
  }
}
