import * as L from 'leaflet';
import "leaflet.locatecontrol/dist/L.Control.Locate.min.js";
import { HttpClient } from 'aurelia-fetch-client';
import { inject, BindingEngine, bindable } from "aurelia-framework";
import * as leafletPip from "@mapbox/leaflet-pip";
import { Issue } from './Issue';
import { IssueService } from './IssueService';
import "leaflet.icon.glyph/Leaflet.Icon.Glyph.js";
import { DialogService } from 'aurelia-dialog';
import { ViewIssue } from './ViewIssue';
@inject(HttpClient, IssueService, BindingEngine, DialogService)
export class MapWidget {
  @bindable selectMarker;
  @bindable selectedMarkerId;
  @bindable issues;
  @bindable bounds;
  @bindable latLngZoom;
  //https://docs.mongodb.com/manual/reference/operator/query/box/
  map;
  activeRegion;
  markers = new Map();
  issuesChanged() {
    this.bindingEngine.collectionObserver(this.issues)
      .subscribe(this.issuesCollectionChanged.bind(this));
  }
  latLngZoomChanged() {
    console.log(this.latLngZoom);
  }
  issuesCollectionChanged(changes) {
    for (let i = 0; i < changes.length; i++) {
      const type = changes[i].type;
      const id = changes[i].key;
      if (type === "delete") {
        const marker = this.markers.get(id);
        if (marker) {
          marker.remove();
          this.markers.delete(id);
        }
      }
      if (type === "add") {
        this.addMarker(id, this.issueService.getIssue(id));
      }
      if (type == "update") {
        const marker = this.markers.get(id);
        if (marker) {
          marker.setIcon(this.getIcon(this.issues.get(id)));
          marker.setLatLng(this.issues.get(id).latlng);
        }
      }
    }
  }
  selectedMarkerIdChanged(newSelection, oldSelection) {
    const newMarker = this.markers.get(newSelection);
    if (newMarker) {
      newMarker.setIcon(this.getIcon(this.issues.get(newSelection)));
    }
    const oldMarker = this.markers.get(oldSelection);
    if (oldMarker) {
      oldMarker.setIcon(this.getIcon(this.issues.get(oldSelection)));
    }
  }
  constructor(http, issueService, bindingEngine, dialogService) {
    this.dialogService = dialogService;
    this.http = http;
    this.issueService = issueService;
    this.bindingEngine = bindingEngine;
  }
  addIssue(latlng) {
    var marker = new L.marker(latlng, { draggable: 'true' }).addTo(this.map);
    this.dialogService
      .open({
        viewModel: ViewIssue, model: {
          issue: {
            latlng: latlng,
            author: "author"
          }, editing: true, newIssue: true
        }, lock: false
      })
      .whenClosed(response => {
        marker.remove();
        if (!response.wasCancelled) {
          this.selectMarker({ id: response.output });
        }
      });
  }
  async attached() {

    this.map = L.map('map', { attributionControl: false })
    if (this.latLngZoom) {
      const parts = this.latLngZoom.split(',')
      this.map.setView([parts[0], parts[1]], parts[2]);
    }
    L.control.locate().addTo(this.map);
    const response = await this.http.fetch('https://nominatim.openstreetmap.org/search.php?q=ada+county+Idaho&polygon_geojson=1&format=geojson');
    const data = await response.json();
    this.activeRegion = L.geoJson(data, {
      style: {
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.0
      }
    });
    this.activeRegion.addTo(this.map);
    let urlTemplate = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    this.map.addLayer(L.tileLayer(urlTemplate, {
      bounds: this.activeRegion.getBounds(),
      maxZoom: 19,
      minZoom: 4
    }));
    this.map.locate({ enableHighAccuracy: true, setView: (!this.latLngZoom), maxZoom: 16 });
    let timer, prevent;
    this.map.on("move", (e) => {
      this.bounds = this.map.getBounds();
    });
    this.map.on("moveend", (e) => {
      
      this.latLngZoom = this.map.getCenter().lat.toFixed(7) + "," + this.map.getCenter().lng.toFixed(7) + "," + this.map.getZoom();
    });
    this.map.on("click", (e) => {
      timer = setTimeout((() => {
        if (!prevent) {
          this.addIssue(e.latlng);
        }
        prevent = false;
      }).bind(this), 300);
    })
      .on("dblclick", () => {
        clearTimeout(timer);
        prevent = true;
      });
  }
  getIcon(issue) {
    let extraCss = this.selectedMarkerId == issue.id ? "selectedMarker" : "unselectedMarker"
    L.Icon.Glyph.MDI = L.Icon.Glyph.extend({
      options: {
        prefix: 'fas',
        iconUrl: 'marker.png',
        shadowUrl: 'shadow.png',
        iconAnchor: [24, 48],
        shadowSize: [48, 48],
        iconSize: [48, 48],
        shadowAnchor: [0, 28]
      }
    });
    L.icon.glyph.mdi = function (options) { return new L.Icon.Glyph.MDI(options); };
    return L.icon.glyph.mdi({ className: extraCss, prefix: 'fas', glyph: Issue.mapping[issue.issueType].glyph, glyphSize: "18px", glyphAnchor: [0, -6] });
  }
  addMarker = (id, issue) => {
    const latlng = issue.latlng;
    const layersContainingPoint = leafletPip.pointInLayer(latlng, this.activeRegion);
    if (layersContainingPoint.length > 0) {
      var marker = new L.marker(latlng, { icon: this.getIcon(issue) }).addTo(this.map);
      marker.on('click', () => {
        this.selectMarker({ id: id });
      });
      this.markers.set(id, marker);
    } else {
      this.issueService.removeIssue(id);
    }
  }

  pointIsInVisibleMap(latlng) {
    return this.map.getBounds().contains(latlng);
  }

  displayPopup(id) {
    L.popup()
      .setLatLng({
        lat: this.markers.get(id)._latlng.lat,
        lng: this.markers.get(id)._latlng.lng
      })
      .setContent(this.issues.get(id).description)
      .openOn(this.map);
  }
}
