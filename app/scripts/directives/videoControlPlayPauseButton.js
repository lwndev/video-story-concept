'use strict';

angular.module('storyConceptApp')
  .directive('videoControlPlayPauseButton', function () {
    return {
      templateUrl: 'templates/videoControlPlayPauseButton.html',
      scope: {
        buttonIsPlaying: '='
      },
      restrict: 'E',
      link: function postLink(scope) {
        scope.togglePlayPause = function () {
          scope.buttonIsPlaying = !scope.buttonIsPlaying;
        };
      }
    };
  });
