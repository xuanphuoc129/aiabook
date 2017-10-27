import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookFavoritePage } from './book-favorite';

@NgModule({
  declarations: [
    BookFavoritePage,
  ],
  imports: [
    IonicPageModule.forChild(BookFavoritePage),
  ],
})
export class BookFavoritePageModule {}
