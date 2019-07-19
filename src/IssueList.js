import { bindable } from "aurelia-framework";
export class IssueList {
  @bindable selectedMarkerId;
  @bindable selectMarker;
  @bindable issues;
  selectedMarkerIdChanged() {
    const el = document.getElementById('issueNum' + this.selectedMarkerId);
    if (el)
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  constructor() {
    this.selectedMarkerIdChanged = this.selectedMarkerIdChanged.bind(this);
  }
}
