import { Component,ViewChild } from '@angular/core';
import { Platform,Keyboard,ToastController,IonicApp,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { Storage } from "@ionic/storage";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'LoginPage';
  constructor(
    public platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    storage: Storage,
    public keyboard: Keyboard,
    public toastCtrl: ToastController,
    public ionicApp: IonicApp
  ) {
    /* 当storage准备就绪之后，判断 USER_INFO 中是否记录登录状态 */
    storage.ready().then(() => {
      storage.get('UserInfo').then((value: string) => {
        console.log(value);
        let isRemember = !!value ? JSON.parse(value).isrremovestore : false;
        if (isRemember)
          this.rootPage = TabsPage;
        else
          this.rootPage = 'LoginPage';
      })
    });


    //默认登录样式等等
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      //注册硬件返回按钮事件
      this.registerBackButtonAction();
    });
  }

  private registerBackButtonAction(){
    this.platform.registerBackButtonAction(()=>{
      //如果键盘开启则隐藏键盘
      if(this.keyboard.isOpen()){
        this.keyboard.close();
        return;
      }

      let activePortal = this.ionicApp._modalPortal.getActive();
      if(activePortal){
        activePortal.dismiss().catch(()=>{});
        activePortal.onDidDismiss(()=>{});
        return;
      }

      //当前页面为tab栏，退出APP
      //当前页面为tab栏的子页面，正常返回
      let activeVC = this.nav.getActive();
      let tabs = activeVC.instance.tabs;
      let activeNav = tabs.getSelected();
      return activeNav.canGoBack()?activeNav.pop():this.showExit();
    },1);
  }
  

  @ViewChild(Nav) nav:Nav;
  private backButtonPressed: boolean = false;//双击退出按钮是否按了2次
  private showExit(){
    if(this.backButtonPressed){
      this.platform.exitApp();
    }else{
      this.toastCtrl.create({
        message:'再按一次退出应用',
        duration:2000,
        position:'top'
      }).present();
      this.backButtonPressed = true;
      //2秒内没有再次点击返回则将触发标志标记为false
      setTimeout(() => {
        this.backButtonPressed = false;
      }, 2000);
    }
  }

}
