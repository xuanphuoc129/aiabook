import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LendbookPage } from './lendbook';

@NgModule({
  declarations: [
    LendbookPage,
  ],
  imports: [
    IonicPageModule.forChild(LendbookPage),
  ],
})
export class LendbookPageModule {}
