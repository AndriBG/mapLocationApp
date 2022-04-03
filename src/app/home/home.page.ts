import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

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

  constructor(public navCtrl: NavController) {}

   viewMap () {
    this.navCtrl.navigateForward('/view-map/'+this.name+'/'+this.latitude+'/'+this.longitude);
  }

}
