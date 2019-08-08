
import { inject } from "aurelia-framework";
import { DialogController, DialogService } from 'aurelia-dialog';
import { IssueService } from './IssueService';
import * as leafletPip from "@mapbox/leaflet-pip";
import { Issue } from "./Issue";
import * as L from 'leaflet';
import "leaflet.icon.glyph/Leaflet.Icon.Glyph.js";
import { HttpClient } from 'aurelia-fetch-client';
@inject(DialogController, DialogService, IssueService, HttpClient)
export class ViewIssue {
  editing = false;
  constructor(controller, dialogService, issueService, http) {
    this.controller = controller;
    this.dialogService = dialogService;
    this.issueService = issueService;
    this.http = http;
  }
  activate(model) {
    if (model.issue)
      this.issue = model.issue;
    this.newIssue = model.newIssue;
    if(model.editing){
      this.editing = true;
      this.beingEditedIssue = JSON.parse(JSON.stringify(this.issue));
    }
  }
  async attached() {
    this.map = L.map('map', {zoomControl:false, attributionControl: false}).setView([this.issue.latlng.lat, this.issue.latlng.lng], 14);
    let urlTemplate = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    this.map.addLayer(L.tileLayer(urlTemplate, {
      maxZoom: 19,
      minZoom: 4
    }));
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
    this.marker = new L.marker(this.issue.latlng, {icon: this.getIcon(this.issue) }).addTo(this.map);
    let startLocation;
    this.marker.on('dragend', (e) => {
      const layersContainingPoint = leafletPip.pointInLayer(e.target._latlng, this.activeRegion);
      if (layersContainingPoint.length == 0) {
        this.marker.setLatLng(startLocation);
      } else {
        this.marker.setLatLng(e.target._latlng);
        this.beingEditedIssue.latlng = e.target._latlng;
      }
    });
    this.marker.on('dragstart', (e) => {
      startLocation = e.target._latlng;
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
    return L.icon.glyph.mdi({ className: extraCss, prefix: 'fas', glyph: ViewIssue.getIssueTypeGlyph(issue.issueType), glyphSize: "18px", glyphAnchor: [0, -6] });
  }
  setIssueType(issueType) {
    this.beingEditedIssue.issueType = issueType;
    this.marker.setIcon(this.getIcon(this.beingEditedIssue));
  }
  items() {
    return Object.keys(Issue.mapping);
  }
  getIssueTypeName(issueType) {
    return Issue.mapping[issueType].name;
  }
  getIssueTypeGlyph(issueType){
    return ViewIssue.getIssueTypeGlyph(issueType);
  }
  static getIssueTypeGlyph(issueType) {
    if(issueType && Issue.mapping[issueType])
      return Issue.mapping[issueType].glyph;
    return "not-available";
  }
  delete() {
    this.issueService.removeIssue(this.issue.id);
    this.controller.cancel();
  }
  edit(){
    this.marker.dragging.enable();
    this.editing = true;
    this.beingEditedIssue = JSON.parse(JSON.stringify(this.issue));
  }
  cancelEdit(){
    this.marker.dragging.disable();
    this.marker.setIcon(this.getIcon(this.issue));
    this.marker.setLatLng(this.issue.latlng);
    this.editing = false;
  }
  submit(){
    this.marker.dragging.disable();
    this.editing = false;
    this.issue = this.beingEditedIssue;
    this.marker.setIcon(this.getIcon(this.issue));
    this.issueService.upsertIssue(this.issue);
    this.beingEditedIssue = undefined;
  }
}
