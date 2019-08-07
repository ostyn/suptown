
import { inject } from "aurelia-framework";
import { DialogController, DialogService } from 'aurelia-dialog';
import { IssueService } from './IssueService';
import { EditIssue } from './EditIssue';
import { Issue } from "./Issue";
import * as L from 'leaflet';
import "leaflet.icon.glyph/Leaflet.Icon.Glyph.js";
@inject(DialogController, DialogService, IssueService)
export class ViewIssue {
  constructor(controller, dialogService, issueService) {
    this.controller = controller;
    this.dialogService = dialogService;
    this.issueService = issueService;
  }
  activate(issue) {
    if (issue)
      this.issue = issue;
  }
  attached() {
    this.map = L.map('map', {zoomControl:false}).setView([this.issue.latlng.lat, this.issue.latlng.lng], 14);
    let urlTemplate = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    this.map.addLayer(L.tileLayer(urlTemplate, {
      maxZoom: 19,
      minZoom: 4
    }));
    new L.marker(this.issue.latlng, {icon: this.getIcon(this.issue) }).addTo(this.map);
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
  getIssueTypeGlyph(issueType) {
    return Issue.getIssueTypeGlyph(issueType);
  }
  delete() {
    this.issueService.removeIssue(this.issue.id);
    this.controller.cancel();
  }
  edit() {
    this.dialogService
      .open({ viewModel: EditIssue, model: JSON.parse(JSON.stringify(this.issue)), lock: false })
      .whenClosed(response => {
        if (!response.wasCancelled) {
          response.output.dateUpdated = new Date().toISOString();
          this.issue = response.output;
          this.issueService.updateIssue(response.output);
        }
      });
  }
}
