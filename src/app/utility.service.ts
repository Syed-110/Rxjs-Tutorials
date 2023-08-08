import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private _http:HttpClient) { }

  printData(data: any,classSelector: string){
    let li_item = document.createElement("li");
    li_item.innerText = data;
    document.getElementsByClassName(classSelector)[0]?.appendChild(li_item);
  }

  getAllUser(){
    return this._http.get("https://jsonplaceholder.typicode.com/users");
  }

  getAllAlbums(){
    return this._http.get("https://jsonplaceholder.typicode.com/albums");
  }
}
