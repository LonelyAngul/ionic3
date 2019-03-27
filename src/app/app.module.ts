import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from "@ionic/storage";
import { HttpClientModule } from '@angular/common/http';

//导入页面
import { TabsPage } from '../pages/tabs/tabs';
import { ComponentsModule } from "../components/components.module";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginServeProvider } from '../providers/login-serve/login-serve';
import { ToolsProvider } from '../providers/tools/tools';
import { HomeProvider } from '../providers/home/home';
import { HttpServeProvider } from '../providers/http-serve/http-serve';
// 照相机插件
import { Camera } from "@ionic-native/camera";
//图片获取插件
import { ImagePicker } from "@ionic-native/image-picker";

@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages:'true' //隐藏全部子页面tabs
    }),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginServeProvider,
    HttpClientModule,
    ToolsProvider,
    ToolsProvider,
    HomeProvider,
    HttpServeProvider,
    Camera,
    ImagePicker
  ]
})
export class AppModule {}
