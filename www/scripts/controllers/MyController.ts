/// <reference path='../_reference.ts' />

interface IMyControllerScope extends ng.IScope {
  vm: IMyController; // now our view model (vm) in the scope is typed
}

interface IMyController {
  myString: string;
  myFunction: (arg) => boolean;
}

class MyController implements IMyController {
  myString: string = 'initial value';

  // $inject annotation. It provides $injector with information about dependencies to be injected into constructor
  // it is better to have it close to the constructor, because the parameters must match in count and type.
  // See http://docs.angularjs.org/guide/di

  public static $inject = [
    "$scope",
    "$rootScope"
  ];

  constructor(
    private $scope: IMyControllerScope,
    private $rootScope: IAppRootScopeService
  ) {
    var currentClass: MyController = this;
    $scope.vm = this;

    $scope.$on("$destroy", () => {
      // Clean up detached Dom elements
      // Clean up attached listeners
    });

    currentClass.myString = 'assigning variables here';
  }

  myFunction(arg): boolean {
    // arg processing here
    return true;
  }
}