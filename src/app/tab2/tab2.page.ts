import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service'
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-enterprise/social-sharing/ngx';

import {
  Plugins
} from '@capacitor/core';

const { Share } = Plugins;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(public photoService: PhotoService, public actionSheetController: ActionSheetController, private socialSharing: SocialSharing) { }

  ngOnInit() {
    this.photoService.loadSaved();
  }

  async showActionSheet(photo, position) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
        }
      }]
    });
    await actionSheet.present();
  }

  async shareImage() {
    
    let firstPhoto = this.photoService.photos[0];
    
    let fileUri = await this.photoService.getFileUri(firstPhoto);
    
    let shareRet = await Share.share({
      title: 'Placeholder',
      text: 'Placeholder',
      url: fileUri.uri,
      dialogTitle: 'Placeholder'
    });
  }

}
