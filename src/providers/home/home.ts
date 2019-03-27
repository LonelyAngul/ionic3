import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as homes from "./home-interface";
import { HttpServeProvider } from '../http-serve/http-serve';

@Injectable()
export class HomeProvider {

  constructor(public httpserve: HttpServeProvider) {
    console.log('Hello HomeProvider Provider');
  }

  onPageLoaded(data:homes.homeParams){
    return this.httpserve.post(`/depot/listDepot?depotStatus=${data.depotStatus}&pageIndex=${data.pageIndex}&pageSize=${data.pageSize}`,{});  
  }

}
