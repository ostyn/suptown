export class IssueService {
  issues = new Map();
  filteredIssues = new Map();
  nextId = 0;
  getIssues() {
    return this.issues;
  }
  getIssue(id) {
    return this.issues.get(id);
  }
  addIssue(issue) {
    issue.id = this.nextId++;
    this.issues.set(issue.id, issue);
    return issue.id;
  }
  updateIssueLatLng(id, latlng) {
    this.issues.get(id).latlng = latlng;
  }
  removeIssue(id) {
    this.issues.delete(id);
  }
}
