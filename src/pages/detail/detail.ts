import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from "@ionic-native/image-picker";
import { Camera, CameraOptions } from "@ionic-native/camera";

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  item: any;//接受父页面传过来的值
  avatar: string = "";
  img_url: string = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public imagePicker: ImagePicker,
    public camera: Camera
  ) {
    this.item = this.navParams.data;
  }

  ionViewDidLoad() { }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [{
        text: '拍照',
        role: 'takePhoto',
        cssClass: 'zm-action-button',
        handler: () => {
          this.takePhoto();
        }
      }, {
        text: '相册',
        role: 'chooseFromAlbum',
        cssClass: 'zm-action-button',
        handler: () => {
          this.chooseFromAlbum();
        }
      }, {
        text: '取消',
        role: 'cancel',
        cssClass: 'zm-action-button',
        handler: () => {
          console.log("cancel");
        }
      }]
    });
    actionSheet.present().then(value => {
      return value;
    });
  }

  //拍照
  takePhoto() {
    const options: CameraOptions = {
      quality: 100,// 图像质量，范围为0 - 100
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,// 选择图片前是否允许编辑
      targetWidth: 800, // 缩放图像的宽度（像素）
      targetHeight: 800, // 缩放图像的高度（像素）
      saveToPhotoAlbum: true, // 是否保存到相册
    };

    this.camera.getPicture(options).then(imageData => {
      console.log('Image URI: ' + imageData);
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.img_url = base64Image
      //this.avatar = image.slice(7);
    }, error => {
      console.log('Error: ' + error);
    });
  }

  //相册
  chooseFromAlbum() {
    const imgoptions: ImagePickerOptions = {
      maximumImagesCount: 6,
      quality: 100,
      width: 800,
      height: 800
    };

    //获取图片
    this.imagePicker.getPictures(imgoptions).then(results => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    }, (err) => {
      console.log(err);
    });
  }

}
