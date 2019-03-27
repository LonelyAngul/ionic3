import { Injectable } from '@angular/core';
import * as tools from "./login-interface";//全部导入（方法）
import { HttpServeProvider } from '../http-serve/http-serve';

@Injectable()
export class LoginServeProvider {

  constructor(
    private httpserve:HttpServeProvider
  ) {
    console.log('Hello LoginServeProvider Provider');
  }

  //登录
  Login_Data(params?:tools.loginParams){
     return this.httpserve.post(`/user/userLogin?code=${params.code}&password=${params.password}`,{}); 
  }

}
