(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"3U8n":function(e,t,n){"use strict";n.d(t,"a",function(){return w}),n.d(t,"c",function(){return c}),n.d(t,"e",function(){return R}),n.d(t,"d",function(){return a}),n.d(t,"b",function(){return h});var r=n("qrcG"),i=n("70NS");
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
function o(e,t,n,r){var i,o=arguments.length,s=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,r);else for(var u=e.length-1;u>=0;u--)(i=e[u])&&(s=(o<3?i(s):o>3?i(t,n,s):i(t,n))||s);return o>3&&s&&Object.defineProperty(t,n,s),s}function s(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}function u(e){var t=function(e){e.hasOwnProperty("inject")||(e.inject=(r.b.getOwn(r.b.paramTypes,e)||d).slice(),e.inject&&e.inject.length>0&&e.inject[e.inject.length-1]===Object&&e.inject.splice(-1,1))};return e?t(e):t}function c(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return function(t,n,r){if("number"==typeof r)return u(t),void(1===e.length&&(t.inject[r]=e[0]));r?r.value.inject=e:t.inject=e}}var a=r.d.create("aurelia:resolver",function(e){return"function"==typeof e.get||"Resolvers must implement: get(container: Container, key: any): any"});function l(e,t,n){return e===t}var f=function(){function e(e,t){this.strategy=e,this.state=t}return e.prototype.get=function(e,t){if(l(this.strategy,0,this.state))return this.state;if(l(this.strategy,1,this.state)){var n=e.invoke(this.state);return this.state=n,this.strategy=0,n}if(l(this.strategy,2,this.state))return e.invoke(this.state);if(l(this.strategy,3,this.state))return this.state(e,t,this);if(l(this.strategy,4,this.state))return this.state[0].get(e,t);if(l(this.strategy,5,this.state))return e.get(this.state);throw new Error("Invalid strategy: "+this.strategy)},e=o([a(),s("design:paramtypes",[Number,Object])],e)}(),h=(function(){function e(e){this._key=e}var t;t=e,e.prototype.get=function(e){var t=this;return function(){return e.get(t._key)}},e.of=function(e){return new t(e)},e=t=o([a(),s("design:paramtypes",[Object])],e)}(),function(){function e(e){this._key=e}var t;t=e,e.prototype.get=function(e){return e.getAll(this._key)},e.of=function(e){return new t(e)},e=t=o([a(),s("design:paramtypes",[Object])],e)}(),function(){function e(e,t){void 0===t&&(t=!0),this._key=e,this._checkParent=t}var t;return t=e,e.prototype.get=function(e){return e.hasResolver(this._key,this._checkParent)?e.get(this._key):null},e.of=function(e,n){return void 0===n&&(n=!0),new t(e,n)},e=t=o([a(),s("design:paramtypes",[Object,Boolean])],e)}());(function(){function e(e){this._key=e}var t;t=e,e.prototype.get=function(e){return e.parent?e.parent.get(this._key):null},e.of=function(e){return new t(e)},e=t=o([a(),s("design:paramtypes",[Object])],e)})(),function(){function e(e){this._key=e}var t;t=e,e.prototype.get=function(e){var t=this._key,n=e.getResolver(t);return n&&3===n.strategy&&(t=n.state),function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];return e.invoke(t,n)}},e.of=function(e){return new t(e)},e=t=o([a(),s("design:paramtypes",[Object])],e)}(),function(){function e(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];this.key=e,this.asKey=e,this.dynamicDependencies=t}var t;t=e,e.prototype.get=function(e){var t=this.dynamicDependencies.length>0?this.dynamicDependencies.map(function(t){return t["protocol:aurelia:resolver"]?t.get(e):e.get(t)}):void 0,n=this.key,r=e.getResolver(n);r&&3===r.strategy&&(n=r.state);var i=e.invoke(n,t);return e.registerInstance(this.asKey,i),i},e.prototype.as=function(e){return this.asKey=e,this},e.of=function(e){for(var n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];return new(t.bind.apply(t,[void 0,e].concat(n)))},e=t=o([a(),s("design:paramtypes",[Object,Object])],e)}();function p(e){if(null==e)throw new Error("key/value cannot be null or undefined. Are you trying to inject/register something that doesn't exist with DI?")}var d=Object.freeze([]);r.b.registration="aurelia:registration",r.b.invoker="aurelia:invoker";var g=a.decorates,v=function(){function e(e,t,n){this.fn=e,this.invoker=t,this.dependencies=n}return e.prototype.invoke=function(e,t){return void 0!==t?this.invoker.invokeWithDynamicDependencies(e,this.fn,this.dependencies,t):this.invoker.invoke(e,this.fn,this.dependencies)},e}();var y={invoke:function(e,t,n){var r=n.map(function(t){return e.get(t)});return Reflect.construct(t,r)},invokeWithDynamicDependencies:function(e,t,n,r){for(var i,o=n.length,s=new Array(o);o--;){if(null==(i=n[o]))throw new Error("Constructor Parameter with index "+o+" cannot be null or undefined. Are you trying to inject/register something that doesn't exist with DI?");s[o]=e.get(i)}return void 0!==r&&(s=s.concat(r)),Reflect.construct(t,s)}};var w=function(){function e(e){void 0===e&&(e={}),this._configuration=e,this._onHandlerCreated=e.onHandlerCreated,this._handlers=e.handlers||(e.handlers=new Map),this._resolvers=new Map,this.root=this,this.parent=null}return e.prototype.makeGlobal=function(){return e.instance=this,this},e.prototype.setHandlerCreatedCallback=function(e){this._onHandlerCreated=e,this._configuration.onHandlerCreated=e},e.prototype.registerInstance=function(e,t){return this.registerResolver(e,new f(0,void 0===t?e:t))},e.prototype.registerSingleton=function(e,t){return this.registerResolver(e,new f(1,void 0===t?e:t))},e.prototype.registerTransient=function(e,t){return this.registerResolver(e,new f(2,void 0===t?e:t))},e.prototype.registerHandler=function(e,t){return this.registerResolver(e,new f(3,t))},e.prototype.registerAlias=function(e,t){return this.registerResolver(t,new f(5,e))},e.prototype.registerResolver=function(e,t){p(e);var n=this._resolvers,r=n.get(e);return void 0===r?n.set(e,t):4===r.strategy?r.state.push(t):n.set(e,new f(4,[r,t])),t},e.prototype.autoRegister=function(e,t){if("function"==typeof(t=void 0===t?e:t)){var n=r.b.get(r.b.registration,t);return void 0===n?this.registerResolver(e,new f(1,t)):n.registerResolver(this,e,t)}return this.registerResolver(e,new f(0,t))},e.prototype.autoRegisterAll=function(e){for(var t=e.length;t--;)this.autoRegister(e[t])},e.prototype.unregister=function(e){this._resolvers.delete(e)},e.prototype.hasResolver=function(e,t){return void 0===t&&(t=!1),p(e),this._resolvers.has(e)||t&&null!==this.parent&&this.parent.hasResolver(e,t)},e.prototype.getResolver=function(e){return this._resolvers.get(e)},e.prototype.get=function(t){if(p(t),t===e)return this;if(g(t))return t.get(this,t);var n=this._resolvers.get(t);if(void 0===n){if(null===this.parent)return this.autoRegister(t).get(this,t);var i=r.b.get(r.b.registration,t);return void 0===i?this.parent._get(t):i.registerResolver(this,t,t).get(this,t)}return n.get(this,t)},e.prototype._get=function(e){var t=this._resolvers.get(e);return void 0===t?null===this.parent?this.autoRegister(e).get(this,e):this.parent._get(e):t.get(this,e)},e.prototype.getAll=function(e){p(e);var t=this._resolvers.get(e);if(void 0===t)return null===this.parent?d:this.parent.getAll(e);if(4===t.strategy){for(var n=t.state,r=n.length,i=new Array(r);r--;)i[r]=n[r].get(this,e);return i}return[t.get(this,e)]},e.prototype.createChild=function(){var t=new e(this._configuration);return t.root=this.root,t.parent=this,t},e.prototype.invoke=function(e,t){try{var n=this._handlers.get(e);return void 0===n&&(n=this._createInvocationHandler(e),this._handlers.set(e,n)),n.invoke(this,t)}catch(t){throw new i.a("Error invoking "+e.name+". Check the inner error for details.",t,!0)}},e.prototype._createInvocationHandler=function(e){var t,n;if(void 0===e.inject)t=r.b.getOwn(r.b.paramTypes,e)||d;else{t=[];for(var i=e;"function"==typeof i;)t.push.apply(t,(n=i).hasOwnProperty("inject")?"function"==typeof n.inject?n.inject():n.inject:[]),i=Object.getPrototypeOf(i)}var o=r.b.getOwn(r.b.invoker,e)||y,s=new v(e,o,t);return void 0!==this._onHandlerCreated?this._onHandlerCreated(s):s},e}();var b=function(){function e(){}return e.prototype.invoke=function(e,t,n){for(var r=n.length,i=new Array(r);r--;)i[r]=e.get(n[r]);return t.apply(void 0,i)},e.prototype.invokeWithDynamicDependencies=function(e,t,n,r){for(var i=n.length,o=new Array(i);i--;)o[i]=e.get(n[i]);return void 0!==r&&(o=o.concat(r)),t.apply(void 0,o)},e}();function m(e){return function(t){r.b.define(r.b.registration,e,t)}}function R(e){return m(new C(e))}b.instance=new b;var C=function(){function e(e){this._key=e}return e.prototype.registerResolver=function(e,t,n){var r=e.getResolver(this._key||t);return void 0===r?e.registerTransient(this._key||t,n):r},e}();!function(){function e(e,t){void 0===t&&(t=!1),"boolean"==typeof e?this._registerInChild=e:(this._key=e,this._registerInChild=t)}e.prototype.registerResolver=function(e,t,n){var r=this._registerInChild?e:e.root,i=r.getResolver(this._key||t);return void 0===i?r.registerSingleton(this._key||t,n):i}}()},"P/zd":function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n.d(t,"b",function(){return i}),n.d(t,"c",function(){return o}),n.d(t,"d",function(){return s});var r=function(){function e(){}return e.prototype.getDialogContainer=function(){throw new Error("DialogRenderer must implement getDialogContainer().")},e.prototype.showDialog=function(e){throw new Error("DialogRenderer must implement showDialog().")},e.prototype.hideDialog=function(e){throw new Error("DialogRenderer must implement hideDialog().")},e}();function i(e){var t=new Error("Operation cancelled.");return t.wasCancelled=!0,t.output=e,t}function o(e,t,n){return"function"==typeof e[t]?new Promise(function(r){r(e[t](n))}).then(function(e){return null==e||e}):Promise.resolve(!0)}var s=function(){function e(e,t,n,r){this.resolve=n,this.reject=r,this.settings=t,this.renderer=e}return e.prototype.releaseResources=function(e){var t=this;return o(this.controller.viewModel||{},"deactivate",e).then(function(){return t.renderer.hideDialog(t)}).then(function(){t.controller.unbind()})},e.prototype.cancelOperation=function(){if(!this.settings.rejectOnCancel)return{wasCancelled:!0};throw i()},e.prototype.ok=function(e){return this.close(!0,e)},e.prototype.cancel=function(e){return this.close(!1,e)},e.prototype.error=function(e){var t=this,n=function(e){var t=new Error;return t.wasCancelled=!1,t.output=e,t}(e);return this.releaseResources(n).then(function(){t.reject(n)})},e.prototype.close=function(e,t){var n=this;if(this.closePromise)return this.closePromise;var r={wasCancelled:!e,output:t};return this.closePromise=o(this.controller.viewModel||{},"canDeactivate",r).catch(function(e){return n.closePromise=void 0,Promise.reject(e)}).then(function(o){return o?n.releaseResources(r).then(function(){return!n.settings.rejectOnCancel||e?n.resolve(r):n.reject(i(t)),{wasCancelled:!1}}).catch(function(e){return n.closePromise=void 0,Promise.reject(e)}):(n.closePromise=void 0,n.cancelOperation())})},e.inject=[r],e}()},"aurelia-dialog":function(e,t,n){"use strict";n.r(t),n.d(t,"DefaultDialogSettings",function(){return u}),n.d(t,"DialogConfiguration",function(){return f}),n.d(t,"DialogService",function(){return p}),n.d(t,"configure",function(){return g});var r=n("P/zd");n.d(t,"DialogController",function(){return r.d}),n.d(t,"Renderer",function(){return r.a}),n.d(t,"createDialogCancelError",function(){return r.b});var i=n("70NS"),o=n("3U8n"),s=n("hij8"),u=function(){this.lock=!0,this.startingZIndex=1e3,this.centerHorizontalOnly=!1,this.rejectOnCancel=!1,this.ignoreTransitions=!1},c={ux:function(){return n.e(0).then(n.bind(null,"yfWE")).then(function(e){return e.DialogRenderer})},native:function(){return n.e(0).then(n.bind(null,"MzFQ")).then(function(e){return e.NativeDialogRenderer})}},a={"ux-dialog":function(){return n.e(0).then(n.bind(null,"mbV6")).then(function(e){return e.UxDialog})},"ux-dialog-header":function(){return n.e(0).then(n.bind(null,"kAWR")).then(function(e){return e.UxDialogHeader})},"ux-dialog-body":function(){return n.e(0).then(n.bind(null,"K1pw")).then(function(e){return e.UxDialogBody})},"ux-dialog-footer":function(){return n.e(0).then(n.bind(null,"It9J")).then(function(e){return e.UxDialogFooter})},"attach-focus":function(){return n.e(0).then(n.bind(null,"e1DJ")).then(function(e){return e.AttachFocus})}},l=function(){return n.e(0).then(n.bind(null,"em5G")).then(function(e){return e.default})},f=function(){function e(e,t){var n=this;this.renderer="ux",this.cssText=l,this.resources=[],this.fwConfig=e,this.settings=e.container.get(u),t(function(){return n._apply()})}return e.prototype._apply=function(){var e=this,t=this.renderer,n=this.cssText;return Promise.all(["string"==typeof t?c[t]():t,n?"string"==typeof n?n:n():""]).then(function(t){var n=t[0],o=t[1],s=e.fwConfig;return s.transient(r.a,n),o&&i.b.injectStyles(o),Promise.all(e.resources.map(function(e){return a[e]()})).then(function(e){s.globalResources(e)})})},e.prototype.useDefaults=function(){return this.useRenderer("ux").useCSS(l).useStandardResources()},e.prototype.useStandardResources=function(){return Object.keys(a).forEach(this.useResource,this),this},e.prototype.useResource=function(e){return this.resources.push(e),this},e.prototype.useRenderer=function(e,t){return this.renderer=e,t&&Object.assign(this.settings,t),this},e.prototype.useCSS=function(e){return this.cssText=e,this},e}();function h(e,t){return this.then(function(e){return e.wasCancelled?e:e.closeResult}).then(e,t)}var p=function(){function e(e,t,n){this.controllers=[],this.hasOpenDialog=!1,this.hasActiveDialog=!1,this.container=e,this.compositionEngine=t,this.defaultSettings=n}return e.prototype.validateSettings=function(e){if(!e.viewModel&&!e.view)throw new Error('Invalid Dialog Settings. You must provide "viewModel", "view" or both.')},e.prototype.createCompositionContext=function(e,t,n){return{container:e.parent,childContainer:e,bindingContext:null,viewResources:null,model:n.model,view:n.view,viewModel:n.viewModel,viewSlot:new s.p(t,!0),host:t}},e.prototype.ensureViewModel=function(e){return"object"==typeof e.viewModel?Promise.resolve(e):this.compositionEngine.ensureViewModel(e)},e.prototype._cancelOperation=function(e){if(!e)return{wasCancelled:!0};throw Object(r.b)()},e.prototype.composeAndShowDialog=function(e,t){var n=this;return e.viewModel||(e.bindingContext={controller:t}),this.compositionEngine.compose(e).then(function(e){return t.controller=e,t.renderer.showDialog(t).then(function(){n.controllers.push(t),n.hasActiveDialog=n.hasOpenDialog=!!n.controllers.length},function(t){return e.viewModel&&Object(r.c)(e.viewModel,"deactivate"),Promise.reject(t)})})},e.prototype.createSettings=function(e){return"boolean"==typeof(e=Object.assign({},this.defaultSettings,e)).keyboard||e.keyboard||(e.keyboard=!e.lock),"boolean"!=typeof e.overlayDismiss&&(e.overlayDismiss=!e.lock),Object.defineProperty(e,"rejectOnCancel",{writable:!1,configurable:!0,enumerable:!0}),this.validateSettings(e),e},e.prototype.open=function(e){var t=this;void 0===e&&(e={});var n,i,o=(e=this.createSettings(e)).childContainer||this.container.createChild(),s=new Promise(function(e,t){n=e,i=t}),u=o.invoke(r.d,[e,n,i]);o.registerInstance(r.d,u),s.then(function(){d(t,u)},function(){d(t,u)});var c,a=this.createCompositionContext(o,u.renderer.getDialogContainer(),u.settings),l=this.ensureViewModel(a).then(function(e){return!e.viewModel||Object(r.c)(e.viewModel,"canActivate",u.settings.model)}).then(function(e){return e?t.composeAndShowDialog(a,u).then(function(){return{controller:u,closeResult:s,wasCancelled:!1}}):t._cancelOperation(u.settings.rejectOnCancel)});return(c=l).whenClosed=h,c},e.prototype.closeAll=function(){return Promise.all(this.controllers.slice(0).map(function(e){return e.settings.rejectOnCancel?e.cancel().then(function(){return null}).catch(function(t){if(t.wasCancelled)return e;throw t}):e.cancel().then(function(t){return t.wasCancelled?e:null})})).then(function(e){return e.filter(function(e){return!!e})})},e.inject=[o.a,s.e,u],e}();function d(e,t){var n=e.controllers.indexOf(t);-1!==n&&(e.controllers.splice(n,1),e.hasActiveDialog=e.hasOpenDialog=!!e.controllers.length)}function g(e,t){var n=null,r=new f(e,function(e){n=e});return"function"==typeof t?t(r):r.useDefaults(),n()}},"aurelia-event-aggregator":function(e,t,n){"use strict";n.d(t,"a",function(){return u}),n.d(t,"configure",function(){return c});var r=n("MP1E").getLogger("event-aggregator"),i=function(){function e(e,t){this.messageType=e,this.callback=t}return e.prototype.handle=function(e){e instanceof this.messageType&&this.callback.call(null,e)},e}();function o(e,t,n){try{e(t,n)}catch(e){r.error(e)}}function s(e,t){try{e.handle(t)}catch(e){r.error(e)}}var u=function(){function e(){this.eventLookup={},this.messageHandlers=[]}return e.prototype.publish=function(e,t){var n=void 0,r=void 0;if(!e)throw new Error("Event was invalid.");if("string"==typeof e){if(n=this.eventLookup[e])for(r=(n=n.slice()).length;r--;)o(n[r],t,e)}else for(r=(n=this.messageHandlers.slice()).length;r--;)s(n[r],e)},e.prototype.subscribe=function(e,t){var n=void 0,r=void 0;if(!e)throw new Error("Event channel/type was invalid.");return"string"==typeof e?(n=t,r=this.eventLookup[e]||(this.eventLookup[e]=[])):(n=new i(e,t),r=this.messageHandlers),r.push(n),{dispose:function(){var e=r.indexOf(n);-1!==e&&r.splice(e,1)}}},e.prototype.subscribeOnce=function(e,t){var n=this.subscribe(e,function(e,r){return n.dispose(),t(e,r)});return n},e}();function c(e){var t,n;e.instance(u,(t=e.aurelia,n=new u,t.subscribeOnce=function(e,t){return n.subscribeOnce(e,t)},t.subscribe=function(e,t){return n.subscribe(e,t)},t.publish=function(e,t){n.publish(e,t)},n))}},qQke:function(e,t,n){"use strict";n.d(t,"a",function(){return l});var r=n("70NS");var i={fixed:0,incremental:1,exponential:2,random:3},o={maxRetries:3,interval:1e3,strategy:i.fixed},s=function(){function e(e){if(this.retryConfig=Object.assign({},o,e||{}),this.retryConfig.strategy===i.exponential&&this.retryConfig.interval<=1e3)throw new Error("An interval less than or equal to 1 second is not allowed when using the exponential retry strategy")}return e.prototype.request=function(e){var t=e;return t.retryConfig||(t.retryConfig=Object.assign({},this.retryConfig),t.retryConfig.counter=0),t.retryConfig.requestClone=e.clone(),e},e.prototype.response=function(e,t){return delete t.retryConfig,e},e.prototype.responseError=function(e,t,n){var o=t.retryConfig,s=o.requestClone;return Promise.resolve().then(function(){if(o.counter<o.maxRetries){var c=!o.doRetry||o.doRetry(e,t);return Promise.resolve(c).then(function(c){if(c)return o.counter++,new Promise(function(e){return r.d.global.setTimeout(e,function(e){var t=e.interval,n=e.strategy,r=e.minRandomInterval,o=e.maxRandomInterval,s=e.counter;if("function"==typeof n)return e.strategy(s);switch(n){case i.fixed:return u[i.fixed](t);case i.incremental:return u[i.incremental](s,t);case i.exponential:return u[i.exponential](s,t);case i.random:return u[i.random](s,t,r,o);default:throw new Error("Unrecognized retry strategy")}}(o)||0)}).then(function(){var e=s.clone();return"function"==typeof o.beforeRetry?o.beforeRetry(e,n):e}).then(function(e){return n.fetch(Object.assign(e,{retryConfig:o}))});throw delete t.retryConfig,e})}throw delete t.retryConfig,e})},e}();var u=[function(e){return e},function(e,t){return t*e},function(e,t){return 1===e?t:Math.pow(t,e)/1e3},function(e,t,n,r){return void 0===n&&(n=0),void 0===r&&(r=6e4),Math.random()*(r-n)+n}],c=function(){function e(){this.baseUrl="",this.defaults={},this.interceptors=[]}return e.prototype.withBaseUrl=function(e){return this.baseUrl=e,this},e.prototype.withDefaults=function(e){return this.defaults=e,this},e.prototype.withInterceptor=function(e){return this.interceptors.push(e),this},e.prototype.useStandardConfiguration=function(){return Object.assign(this.defaults,{credentials:"same-origin"},this.defaults),this.rejectErrorResponses()},e.prototype.rejectErrorResponses=function(){return this.withInterceptor({response:a})},e.prototype.withRetry=function(e){var t=new s(e);return this.withInterceptor(t)},e}();function a(e){if(!e.ok)throw e;return e}var l=function(){function e(){if(this.activeRequestCount=0,this.isRequesting=!1,this.isConfigured=!1,this.baseUrl="",this.defaults=null,this.interceptors=[],"undefined"==typeof fetch)throw new Error("HttpClient requires a Fetch API implementation, but the current environment doesn't support it. You may need to load a polyfill such as https://github.com/github/fetch")}return e.prototype.configure=function(e){var t;if("object"==typeof e)t={defaults:e};else{if("function"!=typeof e)throw new Error("invalid config");(t=new c).baseUrl=this.baseUrl,t.defaults=Object.assign({},this.defaults),t.interceptors=this.interceptors;var n=e(t);c.prototype.isPrototypeOf(n)&&(t=n)}var r=t.defaults;if(r&&Headers.prototype.isPrototypeOf(r.headers))throw new Error("Default headers must be a plain object.");var i=t.interceptors;if(i&&i.length){if(i.filter(function(e){return s.prototype.isPrototypeOf(e)}).length>1)throw new Error("Only one RetryInterceptor is allowed.");var o=i.findIndex(function(e){return s.prototype.isPrototypeOf(e)});if(o>=0&&o!==i.length-1)throw new Error("The retry interceptor must be the last interceptor defined.")}return this.baseUrl=t.baseUrl,this.defaults=r,this.interceptors=t.interceptors||[],this.isConfigured=!0,this},e.prototype.fetch=function(e,t){var n=this;!function(e){if(e.isRequesting=!!++e.activeRequestCount,e.isRequesting){var t=r.b.createCustomEvent("aurelia-fetch-client-request-started",{bubbles:!0,cancelable:!0});setTimeout(function(){return r.b.dispatchEvent(t)},1)}}(this);var i=this.buildRequest(e,t);return function(e,t,n){return p(e,t,"request","requestError",n)}(i,this.interceptors,this).then(function(e){var t=null;if(Response.prototype.isPrototypeOf(e))t=Promise.resolve(e);else{if(!Request.prototype.isPrototypeOf(e))throw new Error("An invalid result was returned by the interceptor chain. Expected a Request or Response instance, but got ["+e+"]");i=e,t=fetch(e)}return function(e,t,n,r){return p(e,t,"response","responseError",n,r)}(t,n.interceptors,i,n)}).then(function(e){return Request.prototype.isPrototypeOf(e)?n.fetch(e):e}).then(function(e){return h(n),e},function(e){throw h(n),e})},e.prototype.buildRequest=function(e,t){var n,r,i,o=this.defaults||{},s=function(e){var t={};for(var n in e||{})e.hasOwnProperty(n)&&(t[n]="function"==typeof e[n]?e[n]():e[n]);return t}(o.headers);if(Request.prototype.isPrototypeOf(e))n=e,i=new Headers(n.headers).get("Content-Type");else{t||(t={});var u=(r=t.body)?{body:r}:null,c=Object.assign({},o,{headers:{}},t,u);i=new Headers(c.headers).get("Content-Type"),n=new Request(function(e,t){if(f.test(t))return t;return(e||"")+t}(this.baseUrl,e),c)}return i||(new Headers(s).has("content-type")?n.headers.set("Content-Type",new Headers(s).get("content-type")):r&&function(e){try{JSON.parse(e)}catch(e){return!1}return!0}(r)&&n.headers.set("Content-Type","application/json")),function(e,t){for(var n in t||{})t.hasOwnProperty(n)&&!e.has(n)&&e.set(n,t[n])}(n.headers,s),r&&Blob.prototype.isPrototypeOf(r)&&r.type&&n.headers.set("Content-Type",r.type),n},e.prototype.get=function(e,t){return this.fetch(e,t)},e.prototype.post=function(e,t,n){return v(this,e,t,n,"POST")},e.prototype.put=function(e,t,n){return v(this,e,t,n,"PUT")},e.prototype.patch=function(e,t,n){return v(this,e,t,n,"PATCH")},e.prototype.delete=function(e,t,n){return v(this,e,t,n,"DELETE")},e}(),f=/^([a-z][a-z0-9+\-.]*:)?\/\//i;function h(e){if(e.isRequesting=!!--e.activeRequestCount,!e.isRequesting){var t=r.b.createCustomEvent("aurelia-fetch-client-requests-drained",{bubbles:!0,cancelable:!0});setTimeout(function(){return r.b.dispatchEvent(t)},1)}}function p(e,t,n,r){for(var i=[],o=4;o<arguments.length;o++)i[o-4]=arguments[o];return(t||[]).reduce(function(e,t){var o=t[n],s=t[r];return e.then(o&&function(e){return o.call.apply(o,[t,e].concat(i))}||d,s&&function(e){return s.call.apply(s,[t,e].concat(i))}||g)},Promise.resolve(e))}function d(e){return e}function g(e){throw e}function v(e,t,n,r,i){return r||(r={}),r.method=i,n&&(r.body=n),e.fetch(t,r)}}}]);
//# sourceMappingURL=vendors~556c66f2.ed0bb328a14acc2e6538.bundle.map