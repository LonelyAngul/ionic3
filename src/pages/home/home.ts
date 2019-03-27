import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App,MenuController } from 'ionic-angular';
import { HomeProvider } from "../../providers/home/home";
import { ToolsProvider } from "../../providers/tools/tools";
import * as homes from "../../providers/home/home-interface";

import { DetailPage } from "../detail/detail";

//懒加载
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  deptList: any[] = [];
  pageindex: number = 1;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public homehttp: HomeProvider,
    private tools: ToolsProvider
  ) { 
  }

  ionViewWillEnter() {
    console.log('ok');
    
    //this.tools.ShowLoading('正在加载');
    let parame = {
      depotStatus: 1,
      pageIndex: this.pageindex,
      pageSize: 12
    }
    this.homehttp.onPageLoaded(parame).subscribe((res: Response | any) => {
      console.log(res);
      if (res.data['length'] > 0) {
        this.tools.HideLoading();
        this.deptList.push(...res.data);
        console.log(this.deptList);

      }
    }, err => {
      this.tools.HideLoading();
      this.tools.showalert(err.error.message);
      this.navCtrl.push('LoginPage')
    });
  }

  //下拉刷新
  doRefresh(refresher) {
    this.pageindex = 1;
    setTimeout(() => {
      this.deptList = [];
      this.ionViewWillEnter();
      refresher.complete();
    }, 1000);
  }

  //点击一条数据
  Active(item) {
    //alert(JSON.stringify(item));
    this.navCtrl.push('DetailPage',item);
  }

  //记载更多
  doInfinite(infiniteScroll) {
    this.pageindex++;
    setTimeout(() => {
      this.ionViewWillEnter();
      infiniteScroll.complete();
    }, 500);
  }

}
