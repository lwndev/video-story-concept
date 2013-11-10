'use strict';

angular.module('storyConceptApp')
  .directive('videoPlayback', function () {
    return {
      scope: {
        videoPlaybackTimecode: '=',
        videoPlaybackIsPlaying: '=',
        videoPlaybackIsPaused: '=',
        videoPlaybackIsStarted: '=',
        videoPlaybackIsEnded: '=',
        videoPlaybackIsMuted: '=',
        videoPlaybackIsFullscreen: '=',
        videoPlaybackVidSrc: '@',
        videoPlaybackImgSrc: '@'
      },
      templateUrl: 'templates/videoPlayback.html',
      restrict: 'E',
      link: function postLink(scope, element) {

        scope.videoPlayer = element.find('video');
        scope.videoElement = scope.videoPlayer[0];
        scope.posterImage = element.find('img');
        scope.showVideoElement = false;
        scope.showPosterFrame = true;
        scope.progress = 0;
        scope.downloaded = 0;
        scope.totalDownloaded = 0;
        scope.duration = 0;
        scope.currentTime = 0;
        scope.timecode = 0;
        scope.timecodeText = '00:00:00 / 00:00:00';
        scope.timeUpdate = 0;
        scope.progressUpdate = 0;
        scope.currentCuePoint = null;
        scope.videoPlaybackTimecode = null;
        scope.videoIsInViewport = true;

        scope.videoPlaybackIsStarted = false;
        scope.videoPlaybackIsEnded = false;
        scope.videoPlaybackIsPlaying = false;
        scope.videoPlaybackIsPaused = false;
        scope.videoPlaybackIsMuted = false;

        // --------------------------------------------------------------------------
        // Scope Event Handlers
        // --------------------------------------------------------------------------

        scope.$watch('videoPlaybackIsPlaying', function () {
          if( scope.videoPlaybackIsPlaying === true){
            if(scope.videoElement.paused === true){
              scope.playVideo();
            }
          } else {
            if(scope.videoElement.paused === false){
              scope.pauseVideo();
            }
          }
        });

        scope.$watch('videoPlaybackIsMuted', function () {
          if( scope.videoPlaybackIsMuted === true){
            if(scope.videoElement.muted === false){
              scope.muteVideo();
            }
          } else {
            if(scope.videoElement.muted === true){
              scope.unmuteVideo();
            }
          }
        });

        scope.$watch('videoPlaybackIsFullscreen', function () {
          scope.videoPlaybackGoFullscreen();
        });

        // --------------------------------------------------------------------------
        // Video Element Event Handlers
        // --------------------------------------------------------------------------

        scope.videoPlayer.bind('ended', function () {
          scope.$apply(function () {
            scope.videoPlaybackIsEnded = true;
            scope.videoPlaybackIsStarted = false;
            scope.showVideoElement = false;
            scope.showPosterFrame = true;
          });
        });

        scope.videoPlayer.bind('play', function () {
          scope.$apply(function () {
            scope.videoPlaybackIsStarted = true;
            scope.videoPlaybackIsPlaying = true;
            scope.videoPlaybackIsPaused = false;
            scope.videoPlaybackIsEnded = false;
            scope.showVideoElement = true;
            scope.showPosterFrame = false;
          });
        });

        scope.videoPlayer.bind('pause', function () {
          scope.$apply(function () {
            scope.videoPlaybackIsPlaying = false;
            scope.videoPlaybackIsPaused = true;
          });
        });

        scope.videoPlayer.bind('volumechange', function () {
          console.log('scope.muted: ' + scope.videoElement.muted);
        });

        scope.videoPlayer.bind('timeupdate', function (e) {
          scope.$apply(function () {
            scope.videoPlaybackTimecode = {currentTime: e.srcElement.currentTime, duration: e.srcElement.duration};
          });

          scope.videoIsInViewport = isElementInViewport(scope.videoElement);

          if(scope.videoIsInViewport === true && scope.showPosterFrame === false){
            scope.showVideoElement = true;
          }else{
            scope.hideHeroVideo = false;
          }
        });

        scope.videoPlayer.bind('progress', function (e) {
          try {
            var downloadValue = Math.floor((e.srcElement.buffered.end(0) / e.srcElement.duration) * 100);

            scope.$apply(function () {
              scope.progressUpdate = {downloaded: downloadValue};
            });
          } catch(e) {}

        });

        $(window).on('scroll',function () {
          if(scope.vidElem !== undefined && scope.vidElem !== null){
            scope.videoIsInViewport = isElementInViewport(scope.vidElem);
          }
        });

        // --------------------------------------------------------------------------
        // Video Control Functions
        // --------------------------------------------------------------------------

        scope.playVideo = function () {
          scope.videoElement.play();
        };

        scope.pauseVideo = function () {
          scope.videoElement.pause();
        };

        scope.muteVideo = function () {
          scope.videoElement.muted = true;
        };

        scope.unmuteVideo = function () {
          scope.videoElement.muted = false;
        };

        scope.seekToTime = function ( value ) {
          scope.videoElement.currentTime = value;
        };

        scope.videoPlaybackGoFullscreen = function() {
          if(scope.videoElement.mozRequestFullScreen) {
            scope.videoElement.mozRequestFullScreen();
          }else if(scope.videoElement.webkitRequestFullScreen){
            scope.videoElement.webkitRequestFullScreen();
          }else if(scope.videoElement.requestFullScreen){
            scope.videoElement.requestFullScreen();
          }
        };

        // --------------------------------------------------------------------------
        // Utility Functions
        // --------------------------------------------------------------------------

        function isElementInViewport(el) {
          var rect = el.getBoundingClientRect();

          return (
            rect.bottom >= (rect.height / 3) &&
              rect.left >= 0 &&
              rect.height <= (window.innerHeight || document.documentElement.clientHeight) &&
              rect.width <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
      }
    };
  });
