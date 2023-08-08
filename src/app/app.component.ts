import { Component, OnInit } from '@angular/core';
import { of, map, delay, switchAll, from, switchMap, mergeMap, concatMap, forkJoin } from 'rxjs';
import { UtilityService } from './utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private _uts:UtilityService){}
  getData(data: any){
    return of(data + " Department").pipe(delay(1000));
  }
  ngOnInit(): void {
    const source: any = from(["CS", "IT", "EC"]);

    //For First UL map
    source
    .pipe(
      map((data:any)=>this.getData(data))
    )
    .subscribe((res:any)=>{
      this._uts.printData(res,"mylist-1");
    })

    //For Second UL map + switchAll
    source
    .pipe(
      map((data:any)=>this.getData(data)),
      switchAll()
    )
    .subscribe((res:any)=>{
      this._uts.printData(res,"mylist-2");
    })

    //For Second UL switchMap
    source
    .pipe(
      switchMap((data:any)=>this.getData(data))
    )
    .subscribe((res:any)=>{
      this._uts.printData(res,"mylist-3");
    })

    //For Second UL mergeMap
    source
    .pipe(
      mergeMap((data:any)=>this.getData(data))
    )
    .subscribe((res:any)=>{
      this._uts.printData(res,"mylist-4");
    })
    
    //For Second UL concatMap
    source
    .pipe(
      concatMap((data:any)=>this.getData(data))
    )
    .subscribe((res:any)=>{
      this._uts.printData(res,"mylist-5");
    })

    //For all api data
    forkJoin([
      this._uts.getAllUser(),
      this._uts.getAllAlbums()
    ])
    .subscribe((res:any)=>{
      for(let i=0;i<res[0].length;i++){
        this._uts.printData(res[0][i].name,"data-1");
        this._uts.printData(res[1][i].title,"data-2");
      }
      
    })
  }
}
