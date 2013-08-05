'use strict';

angular.module('storyConceptApp')
  .directive('videoControls', function () {
    return {
      restrict: 'E',
      scope: {
        videoControlsIsPlaying: '=',
        videoControlsIsMuted: '=',
        videoControlsTimecode: '='
      },
      templateUrl: '/templates/videoControls.html',
      link: function postLink(scope, element, attrs) {

        // Handles call to enter fullscreen from a videoControlFullscreen instance
        scope.videoControlsEnterFullscreen = function () {
           console.log('videoControls :: videoControlsEnterFullscreen');
         }
      }
    };
  });
