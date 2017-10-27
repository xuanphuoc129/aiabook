import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { BookItems } from "../../model/class/bookitem";

/**
 * Generated class for the BookInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book-info',
  templateUrl: 'book-info.html',
})
export class BookInfoPage {
  book : BookItems;
  score = 0;
  comment = "";
  constructor(
  public modal : ModalController,
  public navCtrl: NavController, public navParams: NavParams) {
  }
  ngOnInit(){
    this.book = this.navParams.get('book');
  }
  ionViewDidLoad() {
      // console.log(this.book);
  }
  addBookLend(){
    this.navCtrl.push('LendbookPage',{book: this.book});
  }
  setScore(num){
    this.score = num;
  }
  addComment(){
    let modal  = this.modal.create('AddcommentPage');
    modal.onDidDismiss((res)=>{
      if(res){
        this.comment = res;
      }
    })
    modal.present();  
  }
}
