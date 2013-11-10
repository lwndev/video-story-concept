'use strict';

angular.module('storyConceptApp')
  .directive('videoControlFullscreen', function () {
    return {
      templateUrl: 'templates/videoControlFullscreen.html',
      scope: {
        buttonIsFullscreen: '='
      },
      restrict: 'E',
      link: function postLink(scope) {
        scope.goFullscreen = function () {
          scope.buttonIsFullscreen = !scope.buttonIsFullscreen;
        };
      }
    };
  });
