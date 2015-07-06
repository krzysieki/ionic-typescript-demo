/// <reference path="_reference.ts"/>

interface IAppRootScopeService extends ng.IRootScopeService {
  online: boolean;
  lastScrollTimestamp: number;
  isScrolling: () => boolean;
  onScroll: () => void;
}

var myApp: ng.IModule = angular.module("angularApp", [
  "ngSanitize",
  "ionic",
  "directive.bindonce",
]);

// registering services
myApp.service("serviceName", myNameSpace.MyServiceClassName);

// UI routing (Learn more here: https://github.com/angular-ui/ui-router)
myApp.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider.state("view", {
    url: "/view",
    templateUrl: "views/view.html",
    controller: "ViewController"
  });
});

// Entry point
myApp.run(
  function (
    $rootScope: ft.IAppRootScopeService
  ) {
    // myApp entry point
  }
);