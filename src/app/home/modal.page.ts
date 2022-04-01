import { Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { ModalController} from '@ionic/angular';

declare var google: any;

@Component({
  selector: 'modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss']
})

export class ModalPage implements OnInit{

  @Input() name: string;
  @Input() latitude: number = 18.735693;
  @Input() longitude: number = -70.162651;
  isModal: boolean = false;

  map: any;
  infoWindows: any = [];

  constructor(private  modalController: ModalController){}

  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  ngOnInit(): void {
  }

  ionViewWillLeave() {
    const nodeList = document.querySelectorAll('._gmaps_cdv_');
    for (let k = 0; k < nodeList.length; ++k) {
        nodeList.item(k).classList.remove('_gmaps_cdv_');
    }
  }

  showMap() {
    const location = new google.maps.LatLng(this.latitude, this.longitude);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkerToMap();
  }

  addMarkerToMap() {
    let position = new google.maps.LatLng(this.latitude, this.longitude);
    let mapMarker = new google.maps.Marker({
      position,
      title: this.name,
      latitude: this.latitude,
      longitude: this.longitude
    });
    mapMarker.setMap(this.map);
    // this.addInfoWindowToMarker(mapMarker);
  }

  addInfoWindowToMarker(marker) {
    let infoWindowContent =
    `<div id="content">
      <h2 id="firstHeading" class="firstHeading">${this.name}</h2>
      <p>Latitude: ${this.latitude}</p>
      <p>Longitude: ${this.longitude}</p>
    </div>`;

    let infoWindow = new google.maps.infoWindow({
      content: infoWindowContent
    });

    marker.addEventListener('click', (e) => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindows(){
    for(let window of this.infoWindows) {
      window.close();
    }
  }

  dismiss() {
    this.isModal = false;
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}