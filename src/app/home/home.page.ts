import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ModalPage } from './modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  name: string;
  longitude: number;
  latitude: number;
  isModal: boolean = false;

  constructor(private modal: ModalController, public navCtrl: NavController) {}

   viewMap () {
    this.navCtrl.navigateForward('/view-map/'+this.name+'/'+this.latitude+'/'+this.longitude);
  }

  async viewModelMap () {
    this.isModal = true;
    const modal = await this.modal.create({
      component: ModalPage,
      cssClass: 'my-custom-class',
      keyboardClose: false,
      componentProps: {
        name: this.name,
        latitude: this.latitude,
        longitude: this.longitude
      }
    });

     await modal.present();
  }

}
