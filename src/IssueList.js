import { inject, bindable} from "aurelia-framework";
export class IssueList {
  @bindable selectedMarkerId;
  @bindable selectMarker;
  @bindable issues;
}
