import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from "ionic-angular";

@Injectable()
export class ToolsProvider {

  loading: any;
  constructor(
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    console.log('Hello ToolsProvider Provider');
  }

  //全局的弹出框（toast）
  //Toast全局显示
  public async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      cssClass: '＃f4f5f8',
      showCloseButton: true,
      closeButtonText: '关闭'
    });
    toast.present();
    return toast;
  }

  //全局的loading
  public ShowLoading(msg: string = '') {
    this.loading = this.loadingCtrl.create({
      content: msg + '...'
    });
    this.loading.present();
  }
  // 隐藏loading
  public HideLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }

  //弹出框alert
  showalert(message: string) {
    let alert = this.alertCtrl.create({
      subTitle: message,
      buttons: ["确定"]
    });
    alert.present();
  }
}