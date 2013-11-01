'use strict';

angular.module('storyConceptApp')
  .directive('videoControls', function () {
    return {
      restrict: 'E',
      scope: {
        videoControlsIsPlaying: '=',
        videoControlsIsMuted: '=',
        videoControlsTimecode: '=',
        videoControlsIsFullscreen: '='
      },
      templateUrl: '/templates/videoControls.html'
    };
  });
