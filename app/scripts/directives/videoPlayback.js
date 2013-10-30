'use strict';

angular.module('storyConceptApp')
  .directive('videoPlayback', function () {
    return {
      scope: {
        videoPlaybackTimecode: '=',
        videoPlaybackIsPlaying: '=',
        videoPlaybackIsPaused: '=',
        videoPlaybackIsEnded: '=',
        videoPlaybackIsMuted: '='
      },
      templateUrl: '/templates/videoPlayback.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

        scope.videoPlayer = element.find('video');
        scope.videoElement = scope.videoPlayer[0];
        scope.posterImage = element.find('img');
        scope.videoPlaybackIsStarted = false;
        scope.videoPlaybackIsPlaying = !scope.videoElement.paused;
        scope.videoPlaybackIsPaused = scope.videoElement.paused;
        scope.videoPlaybackIsMuted = scope.videoElement.muted;
        scope.videoPlaybackIsEnded = scope.videoElement.ended;
        scope.progress = 0;
        scope.downloaded = 0;
        scope.totalDownloaded = 0;
        scope.duration = 0;
        scope.currentTime = 0;
        scope.timecode = 0;
        scope.timecodeText = "00:00:00 / 00:00:00";
        scope.timeUpdate = 0;
        scope.progressUpdate = 0;
        scope.currentCuePoint = null;
        scope.videoPlaybackTimecode = null;

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

        // --------------------------------------------------------------------------
        // Video Element Event Handlers
        // --------------------------------------------------------------------------

        scope.videoPlayer.bind('ended', function (e) {
          scope.videoPlaybackIsEnded = true;
        });

        // Video volume change event handler
        scope.videoPlayer.bind('volumechange', function (e) {
          console.log('scope.muted: ' + scope.videoElement.muted);
        });

        // Video playback update handler
        scope.videoPlayer.bind('timeupdate', function (e) {
          scope.$apply(function () {
            scope.videoPlaybackTimecode = {currentTime: e.srcElement.currentTime, duration: e.srcElement.duration};
          });
        });

        // Video download progress handler
        scope.videoPlayer.bind('progress', function (e) {
          try {
            var downloadValue = Math.floor((e.srcElement.buffered.end(0) / e.srcElement.duration) * 100);

            scope.$apply(function () {
              scope.progressUpdate = {downloaded: downloadValue};
            });
          } catch(e) {}

        });

        // --------------------------------------------------------------------------
        // Video Control Functions
        // --------------------------------------------------------------------------

        scope.playVideo = function () {
          scope.videoElement.play();
        }

        scope.pauseVideo = function () {
          scope.videoElement.pause();
        }

        scope.muteVideo = function () {
          scope.videoElement.muted = true;
        }

        scope.unmuteVideo = function () {
          scope.videoElement.muted = false;
        }

        scope.seekToTime = function (data) {
          console.log(data);
        }

        scope.goFullscreen = function() {
          if(scope.videoElement.mozRequestFullScreen) {
            scope.videoElement.mozRequestFullScreen();
          }else if(scope.videoElement.webkitRequestFullScreen){
            scope.videoElement.webkitRequestFullScreen()
          }else if(scope.videoElement.requestFullScreen){
            scope.videoElement.requestFullScreen()
          }
        }
      }
    };
  });
