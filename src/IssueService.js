import firebase from "firebase";
export class IssueService {
  issues = new Map();
  filteredIssues = new Map();
  updateCount = 0;
  constructor() {
    this.db = firebase.firestore();
  }
  getIssues() {
    if (this.issues.size === 0)
      this.fetchIssues().then(() => {
        this.updateCount++;
      });
    return this.issues;
  }
  async fetchIssues() {
    var ref = this.db.collection("issues");
    let snapshot = await ref.get();
    snapshot.forEach(doc => {
      let firebaseIssue = doc.data()
      const issue = {
        ...doc.data(),
        id: doc.id,
        latlng: {
          lat: firebaseIssue.latlng.latitude,
          lng: firebaseIssue.latlng.longitude
        },
        dateCreated: new Date(firebaseIssue.dateCreated.seconds * 1000)
      };
      if(issue.dateUpdated)
        issue.dateUpdated = new Date(firebaseIssue.dateUpdated.seconds * 1000)
      this.issues.set(doc.id, issue);

    });
    return this.issues;
  }
  getIssue(id) {
    return this.issues.get(id);
  }
  async upsertIssue(issue) {
    if (issue.id) {
      let issueToSave = {
        ...issue,
        dateUpdated: new Date(),
        dateCreated: new Date(issue.dateCreated),
        latlng: new firebase.firestore.GeoPoint(issue.latlng.lat, issue.latlng.lng)
      };
      console.log(issueToSave);
      await this.db.collection("issues").doc(issueToSave.id + "").set(issueToSave);
      await this.fetchIssues();
      this.updateCount++;
      return issueToSave;
    } else {
      let currentTime = new Date;
      var issueToSave2 = {
        ...issue,
        dateCreated: currentTime,
        dateUpdated: currentTime,
        latlng: new firebase.firestore.GeoPoint(issue.latlng.lat, issue.latlng.lng),
        author: firebase.auth().currentUser.uid
      };
      console.log(issueToSave2);
      await this.db.collection("issues").add(issueToSave2);
      await this.fetchIssues();
      this.updateCount++;
      return issueToSave2;
    }
  }
  async removeIssue(id) {
    const issue = await this.db.collection("issues").doc(id + "").delete();
    this.issues.delete(id+"");
    this.updateCount++;
    return issue;
  }
}
