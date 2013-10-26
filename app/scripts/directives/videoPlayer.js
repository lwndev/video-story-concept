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
        isMuted: '=',
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

        scope.$watch('timeBarUpdate', function (newValue, oldValue) {
          console.log('newValue: ' + newValue);

          if(newValue !== undefined){
            scope.duration = secondsToHms(duration);
            scope.currentTime = secondsToHms(currentTime);
            scope.timecode =  scope.currentTime + " / " + scope.duration;

            scope.$apply(function () { scope.timecodeText = scope.timecode });
          }
        });

        // refactor elements

        scope.$watch('isPlaying', function () {
          console.log('videoPlayer :: handleIsPlaying change');
        });

        scope.$watch('isMuted', function () {
          console.log('videoPlayer :: handleIsMuted change');
        });

        $(window).on('scroll',function () {
          if(scope.vidElem !== undefined && scope.vidElem !== null){
            videoIsInViewport = isElementInViewport(scope.vidElem);
          }
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
