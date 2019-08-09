import {PLATFORM} from 'aurelia-pal';
export class App {
  configureRouter(config, router) {
    this.router = router;
    config.title = 'suptown';
    config.map([
      { route: [':id?'],       name: 'home',       moduleId: PLATFORM.moduleName('MapView') }
    ]);
  }
}
