import * as L from 'leaflet';
import "leaflet.locatecontrol/dist/L.Control.Locate.min.js";
import { HttpClient } from 'aurelia-fetch-client';
import { inject, BindingEngine, bindable } from "aurelia-framework";
import * as leafletPip from "@mapbox/leaflet-pip";
import { Issue } from './Issue';
import { IssueService } from './IssueService';
import "leaflet.icon.glyph/Leaflet.Icon.Glyph.js";
import {EditIssue} from './EditIssue';
import {DialogService} from 'aurelia-dialog';
@inject(HttpClient, IssueService, BindingEngine, DialogService)
export class MapWidget {
  @bindable selectMarker;
  @bindable selectedMarkerId;
  @bindable issues;
  @bindable bounds;
  //https://docs.mongodb.com/manual/reference/operator/query/box/
  map;
  activeRegion;
  markers = new Map();
  issuesChanged() {
    this.bindingEngine.collectionObserver(this.issues)
      .subscribe(this.issuesCollectionChanged.bind(this));
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
    .open({ viewModel: EditIssue,  lock: false })
    .whenClosed(response => {
      marker.remove();
      if (!response.wasCancelled) {
        let id = this.issueService.addIssue(
          {
            latlng: latlng,
            author: "author",
            title: response.output.title,
            description: response.output.description,
            dateCreated: new Date().toISOString(),
            issueType: response.output.issueType
          });
        this.selectMarker({ id: id });
      }
    });
  }
  async attached() {
    this.map = L.map('map').setView([43.61, -116.19], 13);
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
    this.map.locate({ enableHighAccuracy: true, setView: true, maxZoom: 16 });
    let timer, prevent;
    this.map.on("move", (e) => {
      this.bounds = this.map.getBounds();
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
    let extraCss = this.selectedMarkerId == issue.id ? "" : "unselectedMarker"
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
      var marker = new L.marker(latlng, { draggable: 'true', icon: this.getIcon(issue) }).addTo(this.map);
      marker.on('click', () => {
        this.selectMarker({ id: id });
      });
      let startLocation;
      marker.on('dragend', (e) => {
        const layersContainingPoint = leafletPip.pointInLayer(e.target._latlng, this.activeRegion);
        if (layersContainingPoint.length == 0) {
          marker.setLatLng(startLocation);
        } else {
          this.markers.get(id).setLatLng(e.target._latlng);
          this.issues.get(id).latlng = e.target._latlng;
        }
      });
      marker.on('dragstart', (e) => {
        startLocation = e.target._latlng;
      });
      this.markers.set(id, marker);
    } else {
      this.issueService.removeIssue(id);
    }
  }
  //Probably won't use this because it doesn't work well on mobile
  attachTooltipToMarker(marker) {
    marker.bindTooltip("my tooltip text").openTooltip();
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
