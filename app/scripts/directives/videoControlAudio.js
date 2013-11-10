'use strict';

angular.module('storyConceptApp')
  .directive('videoControlAudio', function () {
    return {
      templateUrl: '/templates/videoControlAudio.html',
      scope: {
        buttonIsMuted: '='
      },
      restrict: 'E',
      link: function postLink(scope) {
        scope.toggleMute = function () {
          scope.buttonIsMuted = !scope.buttonIsMuted;
        };
      }
    };
  });
