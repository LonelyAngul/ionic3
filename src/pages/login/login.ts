import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { TabsPage } from "../tabs/tabs";
import { LoginServeProvider } from "../../providers/login-serve/login-serve";
import { ToolsProvider } from '../../providers/tools/tools';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  iconStyle: object = {'color':'#488aff','font-size':'1.4em'};
  public IsRremoveStore : boolean = false;
  public username:string = '';
  public password:string = '';
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public loginpserve:LoginServeProvider,
    private tools : ToolsProvider
  ) {}

  

  ionViewDidLoad() {}

  //登录
  async login(){
    this.tools.ShowLoading('正在登录');
    let data = {
      isrremovestore: this.IsRremoveStore,
      code: this.username,
      password: this.password
    };
    // 储存用户信息
    this.storage.remove("UserInfo");
    this.storage.set("UserInfo", JSON.stringify(data));
    await this.loginpserve.Login_Data(data).subscribe((result:Response|any)=>{
      console.log(result);
      this.tools.HideLoading();
      this.navCtrl.push(TabsPage);
    },err=>{
      console.log(err);
      this.tools.HideLoading();
      this.tools.showalert(err.error.message);
    });
  }
}