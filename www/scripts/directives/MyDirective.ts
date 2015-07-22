/// <reference path='../../typings/angularjs/angular.d.ts' />

interface IMyDirectiveScope extends ng.IScope {
  bookmarker: string;
}

angular.module('directive.bindonce', [])
  .directive('bindOnce', function () {
    return {
      restrict: 'A',
      scope: true,
      link: ($scope: IMyDirectiveScope): void => {
        setTimeout(() => {
          $scope.$destroy();
        }, 0);
      }
    }
  });