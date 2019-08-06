
import { inject } from "aurelia-framework";
import { DialogController, DialogService } from 'aurelia-dialog';
import { IssueService } from './IssueService';
import { EditIssue } from './EditIssue';
import { Issue } from "./Issue";
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
