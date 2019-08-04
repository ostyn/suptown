import { inject, bindable } from "aurelia-framework";
import { IssueService } from './IssueService';
import {DialogService} from 'aurelia-dialog';
import {EditIssue} from './EditIssue';
@inject(IssueService, DialogService)
export class Issue {
  @bindable issue;
  @bindable selected;

  static GOOD = "GOOD";
  static BAD = "BAD";
  static IDEA = "IDEA";
  static QUESTION = "QUESTION";

  constructor(issueService, dialogService) {
    this.issueService = issueService;
    this.dialogService = dialogService;
  }
  getIssueTypeGlyph(issueType) {
    return Issue.mapping[issueType].glyph;
  }
  static mapping = {
    [this.GOOD] : {glyph: "thumbs-up", name: "Good"},
    [this.BAD] : {glyph: "thumbs-down", name: "Bad"},
    [this.IDEA] : {glyph: "lightbulb", name: "Idea"},
    [this.QUESTION] : {glyph: "question", name: "Question"}
  }
  edit(){
    this.dialogService
    .open({ viewModel: EditIssue, model: JSON.parse(JSON.stringify(this.issue)),  lock: false })
    .whenClosed(response => {
      if (!response.wasCancelled)
      {
        response.output.dateUpdated = new Date().toISOString();
        this.issueService.updateIssue(response.output);
      }
    });
  }
}
