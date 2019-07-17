import { bindable, inject, computedFrom } from "aurelia-framework";
import { IssueService } from './IssueService';
@inject(IssueService)
export class App {
  @bindable bounds;
  boundsChanged() {
    console.log("App knows what you did")
  }
  selectedMarkerId = undefined;
  constructor(issueService) {
    this.issueService = issueService;
  }
  selectMarker = ((id) => {
    if(this.issueService.getIssues().has(id))
      this.selectedMarkerId = id;
  }).bind(this);

  //This happens on every move and creates a new collection, triggering a rebind and clear/load in the map
  //This makes the icon flicker
  @computedFrom('bounds', 'issueService.issues.size')
  get filteredIssues() {
    if (this.bounds) {
      const filtered = new Map();
      for (let [key, issue] of this.issueService.getIssues())
        if (this.bounds.contains(issue.latlng))
          filtered.set(key, issue);
      return filtered;
    }
    return this.issueService.getIssues();
  }
}
