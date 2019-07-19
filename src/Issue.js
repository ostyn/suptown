import { inject, bindable } from "aurelia-framework";
import { IssueService } from './IssueService';
import { EventAggregator } from 'aurelia-event-aggregator';
@inject(IssueService, EventAggregator)
export class Issue {
  @bindable issue;
  @bindable selected;
  static GOOD = "GOOD";
  static BAD = "BAD";
  static IDEA = "IDEA";
  static QUESTION = "QUESTION";

  constructor(issueService, eventAggregator) {
    this.issueService = issueService;
    this.ea = eventAggregator;
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
  issueTypeChanged(id) {
    this.ea.publish('issueTypeChanged', id);
  }
}
