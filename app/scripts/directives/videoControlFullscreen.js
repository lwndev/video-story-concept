'use strict';

angular.module('storyConceptApp')
  .directive('videoControlFullscreen', function () {
    return {
      scope: {
        onFullscreenButtonClick: '&'
      },
      templateUrl: '/templates/videoControlFullscreen.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.goFullscreen = function () {
          scope.onFullscreenButtonClick();
        }
      }
    };
  });
