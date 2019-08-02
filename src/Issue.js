import { inject, bindable } from "aurelia-framework";
import { IssueService } from './IssueService';
@inject(IssueService)
export class Issue {
  @bindable issue;
  @bindable selected;
  editingIssue;
  static GOOD = "GOOD";
  static BAD = "BAD";
  static IDEA = "IDEA";
  static QUESTION = "QUESTION";

  constructor(issueService) {
    this.issueService = issueService;
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
  items(){
    return Object.keys(Issue.mapping);
  }
  getIssueTypeName(issueType){
    return Issue.mapping[issueType].name;
  }
  startEditing(){
    this.editingIssue = JSON.parse(JSON.stringify(this.issue));
    this.editing = true;
  }
  submit(){
    this.issueService.updateIssue(this.editingIssue);
    this.editingIssue = undefined;
    this.editing = false;
  }
  cancel(){
    this.editingIssue = undefined;
    this.editing = false;
  }
}
