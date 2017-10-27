import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserProvider } from "../../providers/user/user";

/**
 * Generated class for the BookFavoritePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
class BookItem {
  name: string;
  photoURL: string;
  selected: boolean;
  constructor(name, photoURL) {
    this.name = name;
    this.photoURL = photoURL;
    this.selected = false;
  }
}
@IonicPage()
@Component({
  selector: 'page-book-favorite',
  templateUrl: 'book-favorite.html',
})
export class BookFavoritePage {
  arr = new Array<BookItem>();
  userfavoritebook: any;
  key = 0;
  constructor(
    public userProvider: UserProvider,
    public firebaseDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.loadBook();
    if (this.navParams.get('key')) {
      this.key = this.navParams.get('key');
    }
  }
  loadBook() {
    this.firebaseDatabase.list('/book-favorite', { preserveSnapshot: true }).subscribe(data => {
      data.forEach(snapshot => {
        this.arr.push(new BookItem(snapshot.val().name, snapshot.val().imgUrl));
      })
      this.getUserDetail().then((res: any) => {
        if (res.have) {
          this.userfavoritebook.forEach((item) => {
            for (var key in this.arr) {
              if (item == this.arr[key].name) {
                this.arr[key].selected = true;
              }
            }
          })
        }
      }).catch((err) => {
        alert(err);
      })
    })
  }
  onSeclectBook(book: BookItem, i) {
    book.selected = !book.selected;
    this.arr[i].selected = book.selected;
  }
  next() {
    this.setBookFavorite();
    if (this.key != 0) {
      this.navCtrl.pop();
    }else{
      this.navCtrl.setRoot('TabsPage');
    }
  }
  setBookFavorite() {
    var newbookfavorite = [];
    this.arr.forEach(item => {
      if (item.selected) {
        newbookfavorite.push(item.name);
      }
    })
    this.userProvider.updateBookFavorite(newbookfavorite).then((res: any) => {
      if (res.success) {
        alert('Cập nhật thành công')
      } else {
        alert(res);
      }
    });
  }
  getUserDetail() {
    this.userfavoritebook = [];
    var promise = new Promise((resolve) => {
      this.userProvider.getUserDetails().then((user: any) => {
        if (user.bookfavorite.length > 0) {
          this.userfavoritebook = user.bookfavorite;
          resolve({ have: true });
        } else {
          resolve({ have: false });
        }
      }).catch((err) => {
        alert(err);
      })
    })
    return promise;

  }
}
