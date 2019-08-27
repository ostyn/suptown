import firebase from "firebase";
export class IssueService {
  issues = new Map();
  filteredIssues = new Map();
  nextId = 0;
  updateCount = 0;
  getIssues() {
    if (this.issues.size === 0)
      this.fetchIssues().then(() => {
        this.updateCount++;
      });
    return this.issues;
  }
  async fetchIssues() {
    var db = firebase.firestore()
    var ref = db.collection("issues");
    let snapshot = await ref.get();
    snapshot.forEach(doc => {
      let firebaseIssue = doc.data()
      this.issues.set(doc.id, {
        ...doc.data(),
        id:doc.id,
        latlng: {
          lat: firebaseIssue.latlng.latitude,
          lng: firebaseIssue.latlng.longitude
        }
      });
    });
    return this.issues;
  }
  getIssue(id) {
    return this.issues.get(id);
  }
  upsertIssue(issue) {
    if (issue.dateCreated)
      issue.dateUpdated = new Date().toISOString();
    else
      issue.dateCreated = new Date().toISOString();
    if (issue.id === undefined)
      issue.id = this.nextId++;
    this.updateCount++;
    this.issues.set(issue.id, issue);
    return issue.id;
  }
  removeIssue(id) {
    this.updateCount++;
    this.issues.delete(id);
  }
}
