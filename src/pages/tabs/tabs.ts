import { Component } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabRoots:Object[];

  constructor() {
    this.tabRoots = [
      {
        root:'HomePage',
        tabTitle:'首页',
        tabIcon:'home'
      },{
        root:'MessagePage', 
        tabTitle:'消息',
        tabIcon:'chatbubbles'
      },{
        root:'ToolPage',
        tabTitle:'工具',
        tabIcon:'construct'
      },{
        root:'MyPage',
        tabTitle:'我的',
        tabIcon:'person'
      }
    ];
  }
}
