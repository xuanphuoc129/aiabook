export class Users {
  uid: string;
  displayName: string;
  photoURL: string;
  address: string;
  distance: string;
  booklend: number;
  bookread: number;
  constructor(uid: string, displayName: string, photoUrl: string, address: string, distance: string, numberBookLend: number, numberBookRead: number) {
    this.displayName = displayName;
    this.photoURL = photoUrl;
    this.distance = distance;
    this.address = address;
    this.booklend = numberBookLend;
    this.bookread = numberBookRead;
    this.uid = uid;
  }

}