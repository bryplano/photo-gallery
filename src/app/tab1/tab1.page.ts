import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';


const { Share } = Plugins;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}

  async shareImage() {
    let shareRet = await Share.share({
      title: 'Stuff',
      text: 'Cool thing',
      url: '',
      dialogTitle: 'Share with people'
    });
  }
}
