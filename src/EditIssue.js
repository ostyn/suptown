import { DialogController } from 'aurelia-dialog';
import { inject } from "aurelia-framework";
import { Issue } from './Issue';
@inject(DialogController)
export class EditIssue {
  issue = {};
  constructor(controller) {
    this.controller = controller;
  }
  activate(issue) {
    if (issue)
      this.issue = issue;
  }
  setIssueType(issueType) {
    console.log(this.issue);
    console.log(issueType);
    this.issue.issueType = issueType;
  }
  items() {
    return Object.keys(Issue.mapping);
  }
  getIssueTypeName(issueType) {
    return Issue.mapping[issueType].name;
  }
  getIssueTypeGlyph(issueType) {
    return "fa fa-" + Issue.mapping[issueType].glyph;
  }
}
