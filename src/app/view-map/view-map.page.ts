import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-view-map',
  templateUrl: './view-map.page.html',
  styleUrls: ['./view-map.page.scss'],
})
export class ViewMapPage implements OnInit {

  name: string;
  latitude: number = 18.735693;
  longitude: number = -70.162651;

  map: any;
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;
  infoWindows: any = [];


  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit(){
    this.showMap();
  }

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');
    this.latitude = parseInt(this.route.snapshot.paramMap.get('latitude'));
    this.longitude = parseInt(this.route.snapshot.paramMap.get('longitude'));
    // this.showMap();
  }

  showMap() {
    const location = new google.maps.LatLng(this.latitude, this.longitude);
    const options = {
      center: location,
      zoom: 15,
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
}
