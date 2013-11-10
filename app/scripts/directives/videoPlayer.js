'use strict';

angular.module('storyConceptApp')
  .directive('videoPlayer', function () {

    return {
      templateUrl: '/templates/videoPlayer.html',
      scope: {
        storyVidSrc: '@',
        storyImgSrc: '@',
        videoPlaying: '&',
        videoStarted: '&',
        videoPaused: '&',
        videoEnded: '&',
        videoUpdate: '&',
        showHeroVideo: '&',
        hideHeroVideo: '&',
        isPlaying: '=',
        isPaused: '=',
        isEnded: '=',
        isMuted: '=',
        isStarted: '=',
        isFullscreen: '=',
        timecodeValue: '=',
        timecodeText: '='
      },
      restrict: 'E',
      link: function postLink(scope,element){

        scope.videoPlayback = element.find('video-playback');
        scope.duration = 0;
        scope.currentTime = 0;
        scope.timecode = 0;
        scope.timecodeText = '00:00:00 / 00:00:00';
        scope.canvasContext = null;
        scope.currentCuePoint = null;
        scope.videoIsInViewport = true;

        scope.$watch('timecodeValue', function (newValue) {
          if(newValue !== undefined && newValue !== null){
            scope.duration = secondsToHms(newValue.duration);
            scope.currentTime = secondsToHms(newValue.currentTime);
            scope.timecodeText =  scope.currentTime + ' / ' + scope.duration;

            scope.videoUpdate({currentTime: newValue.currentTime, duration: newValue.duration});
          }
        });

        scope.$watch('isPlaying', function () {
          if(scope.isPlaying === true){
            console.log('isPlaying');
            scope.videoPlaying();
          }
        });

        scope.$watch('isPaused', function () {
          if(scope.isPaused === true){
            console.log('isPaused');
          }
        });

        scope.$watch('isMuted', function () {
          if(scope.isMuted === true){
            console.log('isMuted');
          }
        });

        scope.$watch('isEnded', function () {
          if(scope.isEnded === true){
            console.log('isEnded');
          }
        });

        scope.$watch('isStarted', function  () {
          if(scope.isStarted === true){
            console.log('isStarted');
          }
        });

        scope.$watch('isFullscreen', function () {
          console.log('isFullscreen');
        });


        // --------------------------------------------------------------------------
        // Utility Functions
        // --------------------------------------------------------------------------

        var secondsToHms = function (d) {
          d = Number(d);
          var h = Math.floor(d / 3600);
          var m = Math.floor(d % 3600 / 60);
          var s = Math.floor(d % 3600 % 60);
          return ((h > 0 ? h + ':' : '') + (m > 0 ? (h > 0 && m < 10 ? '0' : '') + m + ':' : '0:') + (s < 10 ? '0' : '') + s);
        };
      }
    };
  });
