import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMap, GoogleMaps,
  GoogleMapsEvent, ILatLng, LatLngBounds,
  CameraPosition, MarkerOptions,
  Marker, Geocoder,
  Spherical,
  MarkerIcon,
  LatLng,
  BaseArrayClass
} from '@ionic-native/google-maps';

import firebase from 'firebase';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { UserProvider } from "../../providers/user/user";
import { Users } from "../../model/class/user";
import { ChatProvider } from "../../providers/chat/chat";
/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  iconPosition = 'assets/icon/position.png';
  iconPlaceholder = 'assets/icon/placeholder.png';

  result = [];
  accounts: FirebaseListObservable<any>;
  markers: any = [];
  target_point_filter = [];
  map: GoogleMap;
  public currentPosition: ILatLng;
  constructor(
    public chatservice : ChatProvider,
    public userProvider: UserProvider,
    public angularFireDatabase: AngularFireDatabase,
    public geolocation: Geolocation,
    public googleMaps: GoogleMaps,
    public navCtrl: NavController, public navParams: NavParams) {
    // this.loadPosition();
  }
  setImmediate
  ionViewDidEnter(){
    this.loadPosition();
  }
  ngOnInit() {
    this.accounts = this.angularFireDatabase.list('/users', { preserveSnapshot: true });
  }
  viewInfo(buddy){
    this.navCtrl.push('UserInfoPage',{user:buddy});
  }
  getBounds() {
    let positionCamera: any = this.map.getCameraPosition();
    var northeast = new LatLng(positionCamera.northeast.lat, positionCamera.northeast.lng);
    var southwest = new LatLng(positionCamera.southwest.lat, positionCamera.southwest.lng);
    var latlngBounds = new LatLngBounds(southwest, northeast);
    return latlngBounds;
  }
  getPointUserMarker() {

    this.result = [];

    let latlngBounds: LatLngBounds = this.getBounds();

    this.accounts.subscribe(data => {
      data.forEach(snapshot => {
        var position: ILatLng = { lat: snapshot.val().position.lat, lng: snapshot.val().position.lng };
        if (latlngBounds.contains(position)) {
          var distance = this.calculateDistance(this.currentPosition.lat, this.currentPosition.lng, position.lat, position.lng);
          let value = snapshot.val();
          var address, booklend, bookread;
          if (value.address) {
            address = value.address;
          } else {
            address = "";
          }
          if (value.bookLend) {
            booklend = value.booklend.length;
          } else {
            booklend = 0;
          }
          if (value.bookRead) {
            bookread = value.bookread.length;
          } else {
            bookread = 0;
          }
          this.target_point_filter.push(position);

          this.result.push(new Users(value.uid,value.displayName, value.photoURL, address, distance, booklend, bookread));
        }
      });

      this.target_point_filter.forEach(position => {
        this.map.addMarker({
          position: position,
          icon: this.iconPosition
        }).then((marker: Marker) => {
          this.markers.push(marker);
        });
      });
      this.target_point_filter = [];
    });
  }
  degreeToRadian(value) {
    return value * Math.PI / 180;
  }
  calculateDistance(lat1, lng1, lat2, lng2) {
    var distance: number;
    let dLat = this.degreeToRadian(lat2 - lat1);
    let dLng = this.degreeToRadian(lng2 - lng1);
    let tlat1 = this.degreeToRadian(lat1);
    let tlat2 = this.degreeToRadian(lat2);

    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(tlat1) * Math.cos(tlat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    distance = (6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
    var distanceString: string;
    if (distance > 1) {
      distanceString = distance.toFixed(2) + "km";
    } else {
      distanceString = (distance * 1000).toFixed(2) + "m";
    }
    return distanceString;
  }
  loadPosition() {
    return this.geolocation.getCurrentPosition().then(position => {
      this.currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      this.loadMap()
    });
  }
  loadMap() {
    let map = document.getElementById('map');

    let cameraOption: CameraPosition = {
      target: {
        lat: this.currentPosition.lat,
        lng: this.currentPosition.lng
      },
      zoom: 14,
      tilt: 0
    }
    this.map = this.googleMaps.create(map, {
      camera: cameraOption,
      mapType: 'MAP_TYPE_ROADMAP',
    });
    this.map.addMarker({
      position: this.currentPosition,
      icon: this.iconPlaceholder
    });
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.mapReady = true;
      this.showAllMarker();
    });
    this.map.on(GoogleMapsEvent.CAMERA_MOVE_END).subscribe(() => {
      if (!this.mapReady) return;
      this.clearAllMarker();
      this.showAllMarker();
    });
  }
  showAllMarker() {
    this.getPointUserMarker();
  }
  clearAllMarker() {
    this.markers.forEach((marker: Marker) => {
      marker.remove();
    });
    this.markers = [];
  }
  mapReady: boolean = false;

}
