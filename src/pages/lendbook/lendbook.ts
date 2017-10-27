import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BookItems } from "../../model/class/bookitem";
import { BookProvider } from "../../providers/book/book";

/**
 * Generated class for the LendbookPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lendbook',
  templateUrl: 'lendbook.html',
})
export class LendbookPage {
  book : BookItems;
  isLoading : boolean = true;
  quantity  = 0 ;
  constructor(
    public toastCtr: ToastController,
    public bookProvider: BookProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.book = this.navParams.get('book');
    this.isLoading = false;
  }
  addquantity(){
    this.quantity ++ ;
  }
  subquantity(){
    this.quantity -- ;
  }
  addbooklend(){
    // let toast = this.toastCtr.create({
    //   duration:1000,
    //   position: 'bottom'
    // });
    // this.bookProvider.addbooklend(this.book.bookid,this.quantity).then((res: any)=>{
    //   if(res.success){
    //     this.navCtrl.pop();
    //     toast.setMessage('Cập nhật thành công');
    //     toast.present();
    //   }else{
    //     this.navCtrl.pop();
    //     toast.setMessage('Cập nhật thất bại');
    //     toast.present();
    //   }
    // })
  }
}
