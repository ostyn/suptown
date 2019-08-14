import { inject, computedFrom, observable } from "aurelia-framework";
import { Router} from "aurelia-router";
import { IssueService } from './IssueService';
@inject(IssueService, Router)
export class MapView {
  filtered = new Map();
  selectedMarkerId = undefined;
  @observable latLngZoom;
  activate(params, routeConfig){
    if(params.latLngZoom !== undefined)
      this.latLngZoom = params.latLngZoom;
  }
  latLngZoomChanged(){
    this.router.navigateToRoute("home", {latLngZoom: this.latLngZoom});
  }
  constructor(issueService, router) {
    this.issueService = issueService;
    this.router = router;
    window.onbeforeunload = function () {
      return 'Are you sure you want to leave?';
    };
  }
  selectMarker = ((id) => {
    if (this.issueService.getIssues().has(id))
      this.selectedMarkerId = id;
  }).bind(this);

  //This happens on every move and creates a new collection, triggering a rebind and clear/load in the map
  //This makes the icon flicker
  @computedFrom('bounds', 'issueService.updateCount')
  get filteredIssues() {
    if (this.bounds) {
      let newFiltered = new Map();
      //filter original data
      for (let [key, issue] of this.issueService.getIssues()) {
        if (this.bounds.contains(issue.latlng)) {
          newFiltered.set(key, issue);
        }
      }
      //remove unneeded values from old-filtered data
      for (let [key, issue] of this.filtered) {
        if (!newFiltered.has(key))
          this.filtered.delete(key);
      }
      //add all other keys back
      for (let [key, issue] of newFiltered) {
        this.filtered.set(key, issue);
      }
    }
    return this.filtered;
  }
}
