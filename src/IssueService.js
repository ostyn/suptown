export class IssueService {
  issues = new Map();
  filteredIssues = new Map();
  nextId = 0;
  updateCount = 0;
  getIssues() {
    return this.issues;
  }
  getIssue(id) {
    return this.issues.get(id);
  }
  upsertIssue(issue) {
    if(issue.dateCreated)
      issue.dateUpdated = new Date().toISOString();
    else
      issue.dateCreated = new Date().toISOString();
    if(issue.id === undefined)
      issue.id = this.nextId++;
    this.updateCount++;
    this.issues.set(issue.id, issue);
  }
  removeIssue(id) {
    this.updateCount++;
    this.issues.delete(id);
  }
}
