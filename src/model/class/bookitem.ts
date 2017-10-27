export class BookItems {
    bookid: string;
    name: string;
    photoUrl: string;
    constructor(bookid,name, photoUrl) {
      this.bookid = bookid;
      this.name = name;
      this.photoUrl = photoUrl;
    }
  }