import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,Keyboard } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";
import { GoogleMap, GoogleMaps, Geocoder, ILatLng, GoogleMapsEvent, CameraPosition, GeocoderResult} from "@ionic-native/google-maps";

/**
 * Generated class for the AddressPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
  position: ILatLng;
  address: string;
  map: GoogleMap;
  key = 0;
  constructor(
    public keyboard: Keyboard,
    public geocoder: Geocoder,
    public loading: LoadingController,
    public googleMaps: GoogleMaps,
    public userProvider: UserProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.loadMap();
    if(this.navParams.get('key')){
      this.key = this.navParams.get('key');
    }
  }
  search(ev) {
    if(ev.keyCode == 13){
      this.keyboard.close();
      this.geocoder.geocode({
        address: this.address
      }).then((result: GeocoderResult) => {
        this.position = result[0].position;
        this.map.moveCamera({
          target: this.position,
          zoom: 16,
          tilt: 20,
        })
        this.map.addMarker({
          position:this.position
        })
      })
    }else{
      return ;
    }
    
  }
  loadMap() {
    this.userProvider.getUserDetails().then((user: any) => {
      console.log(user);
      this.position = {
        lat: user.position.lat,
        lng: user.position.lng
      }
      let loader = this.loading.create({
        content: 'Please wait..',
        duration: 3000
      });
      loader.present();
      let divMap = document.getElementById('map');
      let camerOption: CameraPosition = {
        target: this.position,
        tilt: 20,
        zoom: 18
      }
      this.map = this.googleMaps.create(divMap, {
        camera: camerOption,
        mapType: "MAP_TYPE_ROADMAP"
      })
      this.map.addMarker({
        position: this.position
      })
      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        this.getAddress();
      })
    })
  }
  getAddress() {
    this.geocoder.geocode({ position: this.position }).then((result: GeocoderResult) => {
      var locate = result[0].subLocality;
      var area = result[0].subAdminArea;
      this.address = locate + " " + area;
    })
  }
  addAddress() {
    this.userProvider.updateAddress(this.address).then((res: any) => {
      this.userProvider.updatePosition(this.position).then((res: any) => {
        if (res.success) {
          alert("Cập nhật thành công");
          if(this.key!=0){
            this.navCtrl.pop();
          }else{
            this.navCtrl.setRoot('BookFavoritePage');
          }
        } else {
          alert(res);
        }
      })
    })
  }
}
