'use strict';

angular.module('storyConceptApp')
  .directive('videoPlayer', function () {

    return {
      templateUrl: '/templates/videoPlayer.html',
      scope: {
        videoSource: '@',
        videoStarted: '&',
        videoPaused: '&',
        showHeroVideo: '&',
        hideHeroVideo: '&',
        isPlaying: '=',
        isEnded: '=',
        isMuted: '=',
        isFullscreen: '=',
        timecodeValue: '=',
        timecodeText: '='
      },
      restrict: 'E',
      link: function postLink(scope,element,attrs){

        var videoIsInViewport = true;

        scope.videoPlayback = element.find('video-playback');
        scope.duration = 0;
        scope.currentTime = 0;
        scope.timecode = 0;
        scope.timecodeText = '00:00:00 / 00:00:00';
        scope.canvasContext = null;
        scope.currentCuePoint = null;

        scope.$watch('timecodeValue', function (newValue, oldValue) {
          if(newValue !== undefined && newValue !== null){
            scope.duration = secondsToHms(newValue.duration);
            scope.currentTime = secondsToHms(newValue.currentTime);
            scope.timecodeText =  scope.currentTime + " / " + scope.duration;
          }
        });

        // refactor elements

        scope.$watch('isPlaying', function () {
          
        });

        scope.$watch('isMuted', function () {
          
        });

        scope.$watch('isFullscreen', function () {
          console.log("isFullscreen");
        });


        // --------------------------------------------------------------------------
        // Utility Functions
        // --------------------------------------------------------------------------

        var secondsToHms = function (d) {
          d = Number(d);
          var h = Math.floor(d / 3600);
          var m = Math.floor(d % 3600 / 60);
          var s = Math.floor(d % 3600 % 60);
          return ((h > 0 ? h + ":" : "") + (m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : "0:") + (s < 10 ? "0" : "") + s);
        };
      }
    };
  });
