import { PLATFORM } from 'aurelia-pal';
export class App {
  configureRouter(config, router) {
    this.router = router;
    config.title = 'suptown';
    config.map([
      { route: [':latLngZoom?'], name: 'home', id:'home', moduleId: PLATFORM.moduleName('MapView') },
      { route: ['issue/:id'], name: 'issue', moduleId: PLATFORM.moduleName('IssueView') }
    ]);
  }
}
