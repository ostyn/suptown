import { bindable } from "aurelia-framework";
export class IssueList {
  @bindable selectedMarkerId;
  @bindable selectMarker;
  @bindable issues;
  selectedMarkerIdChanged() {
    //Using timeout to do this scrollTo once the item has been added to the DOM
    setTimeout(() => {
      const el = document.getElementById('issueNum' + this.selectedMarkerId);
      if (el)
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1);
  }
  constructor() {
    this.selectedMarkerIdChanged = this.selectedMarkerIdChanged.bind(this);
  }
}
