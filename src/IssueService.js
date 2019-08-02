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
  addIssue(issue) {
    this.updateCount++;
    issue.id = this.nextId++;
    this.issues.set(issue.id, issue);
    return issue.id;
  }
  updateIssue(issue) {
    this.updateCount++;
    this.issues.set(issue.id, issue);
  }
  updateIssueLatLng(id, latlng) {
    this.updateCount++;
    this.issues.get(id).latlng = latlng;
  }
  removeIssue(id) {
    this.updateCount++;
    this.issues.delete(id);
  }
}
