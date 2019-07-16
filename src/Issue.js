import { inject, bindable } from "aurelia-framework";
import { IssueService } from './IssueService';
@inject(IssueService)
export class Issue {
  @bindable issue;
  @bindable selected;
  static IssueType = {
    GOOD: 1,
    BAD: 2,
    IDEA: 3,
    QUESTION: 4
  };
  constructor(issueService) {
    this.issueService = issueService;
  }
}
