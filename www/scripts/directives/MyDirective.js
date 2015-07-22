/// <reference path='../../typings/angularjs/angular.d.ts' />
angular.module('directive.bindonce', []).directive('bindOnce', function () {
    return {
        restrict: 'A',
        scope: true,
        link: function ($scope) {
            setTimeout(function () {
                $scope.$destroy();
            }, 0);
        }
    };
});
//# sourceMappingURL=MyDirective.js.map