import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataProvider{
    constructor(public http : Http){

    }
    loadData(){
        return this.http.get('assets/data/data.json').map(res=>res.json());
    }
}