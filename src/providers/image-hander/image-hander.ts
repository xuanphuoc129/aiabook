import { Injectable, NgZone } from '@angular/core';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';
import { Camera } from '@ionic-native/camera';
import firebase from 'firebase';
/*
  Generated class for the ImageHanderProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ImageHanderProvider {
  nativepath: any;
  firestore = firebase.storage();
  constructor(
    public camera: Camera,
    public fileChooser: FileChooser,
    private filePath: FilePath,
    private file: File
  ) {
    // console.log('Hello ImageHanderProvider Provider');
  }
  makefiletoblob(imagepath) {
    return fetch(imagepath).then((res) => {
      return res.blob();
    }).then((blob) => {
      return blob;
    });
  }

  takeimage() {
    var promise = new Promise((resolve) => {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: 1,
        targetHeight: 640,
        cameraDirection: 1,
        saveToPhotoAlbum: true,
        encodingType: 0,
        correctOrientation: true
      }).then((nativepath) => {
        // console.log(imageData);
        var path = nativepath.substring(0, nativepath.lastIndexOf('/') + 1);
        // console.log(path);
        var filename = nativepath.substring(nativepath.lastIndexOf('/') + 1, nativepath.length);

        this.file.readAsArrayBuffer(path, filename).then((arraybuffer) => {
          var imgBlob = new Blob([arraybuffer], { type: 'image/jpeg' });
          var imageStore = this.firestore.ref('/profileimage').child(firebase.auth().currentUser.uid);
          imageStore.put(imgBlob).then(() => {
            this.firestore.ref('/profileimage').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
              resolve(url);
            }).catch((err) => {
              resolve(err);
            })
          }).catch((err) => {
            resolve(err);
          });
        }).catch(err => {
          resolve(err);
        })
      }).catch((err)=>{
        resolve(err);
      })
    })
    return promise;
  }
  uploadimage() {
    var promise = new Promise((resolve) => {
      this.fileChooser.open().then((url) => {
        // console.log(url);
        this.filePath.resolveNativePath(url).then(nativepath => {
          // console.log("resole success", nativepath);
          var path = nativepath.substring(0, nativepath.lastIndexOf('/') + 1);
          // console.log(path);
          var filename = nativepath.substring(nativepath.lastIndexOf('/') + 1, nativepath.length);
          // console.log(filename);
          this.file.readAsArrayBuffer(path, filename).then((arraybuffer) => {
            // console.log('arr', arraybuffer);
            var imgBlob = new Blob([arraybuffer], { type: 'image/jpeg' });
            console.log(imgBlob);
            var imageStore = this.firestore.ref('/profileimage').child(firebase.auth().currentUser.uid);
            imageStore.put(imgBlob).then(() => {
              this.firestore.ref('/profileimage').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
                resolve(url);
              }).catch((err) => {
                resolve(err);
              })
            }).catch((err) => {
              resolve(err);
            });
          }).catch(err => {
            resolve(err);
          })
        })
      }).catch(err => {
        alert('exception');
        resolve(err);
      })
    })
    return promise;
  }
  picmsgstore() {
    var promise = new Promise((resolve) => {
      this.fileChooser.open().then((url) => {
        // console.log(url);
        this.filePath.resolveNativePath(url).then(nativepath => {
          // console.log("resole success", nativepath);
          var path = nativepath.substring(0, nativepath.lastIndexOf('/') + 1);
          // console.log(path);
          var filename = nativepath.substring(nativepath.lastIndexOf('/') + 1, nativepath.length);
          // console.log(filename);
          this.file.readAsArrayBuffer(path, filename).then((arraybuffer) => {
            // console.log('arr', arraybuffer);
            var imgBlob = new Blob([arraybuffer], { type: 'image/jpeg' });
            console.log(imgBlob);
            var imageStore = this.firestore.ref('/picmsg').child(firebase.auth().currentUser.uid).child('picmsg');
            imageStore.put(imgBlob).then(() => {
              this.firestore.ref('/picmsg').child(firebase.auth().currentUser.uid).child('picmsg').getDownloadURL().then((url) => {
                resolve(url);
              }).catch((err) => {
                resolve(err);
              })
            }).catch((err) => {
              resolve(err);
            });
          }).catch(err => {
            resolve(err);
          })
        })
      }).catch(err => {
        alert('exception');
        resolve(err);
      })
    })
    return promise;
  }
}
