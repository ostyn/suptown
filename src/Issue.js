import { inject, bindable } from "aurelia-framework";
import { DialogService } from 'aurelia-dialog';
import { ViewIssue } from './ViewIssue';
@inject(DialogService)
export class Issue {
  @bindable issue;
  @bindable selected;

  static GOOD = "GOOD";
  static BAD = "BAD";
  static IDEA = "IDEA";
  static QUESTION = "QUESTION";

  constructor(dialogService) {
    this.dialogService = dialogService;
  }
  getIssueTypeGlyph(issueType) {
    return Issue.getIssueTypeGlyph(issueType);
  }
  static getIssueTypeGlyph(issueType) {
    if(issueType && Issue.mapping[issueType])
      return Issue.mapping[issueType].glyph;
    return "not-available";
  }
  static mapping = {
    [this.GOOD]: { glyph: "thumbs-up", name: "Good" },
    [this.BAD]: { glyph: "thumbs-down", name: "Bad" },
    [this.IDEA]: { glyph: "lightbulb", name: "Idea" },
    [this.QUESTION]: { glyph: "question", name: "Question" }
  }
  view() {
    if (this.selected)
      this.dialogService
        .open({ viewModel: ViewIssue, model: {issue: this.issue}, lock: false });
  }
}
