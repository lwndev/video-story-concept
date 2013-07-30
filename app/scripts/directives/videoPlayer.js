'use strict';

angular.module('storyConceptApp')
  .directive('videoPlayer', function () {

    return {
      templateUrl: '/templates/videoPlayer.html',
      scope: {
        clickTarget: '&',
        clickYouTarget: '&',
        videoStarted: '&',
        videoPaused: '&',
        showHeroVideo: '&',
        hideHeroVideo: '&',
        title: '@',
        description: '@',
        route: '@',
        vidsource: '@',
        imgsource: '@'
      },
      restrict: 'E',
      replace: true,
      link: function postLink(scope,element,attrs){
        var videoIsInViewport = true;

        scope.videoPlayer = element.find('video');
        scope.posterImage = element.find('img');
        scope.vidElem = scope.videoPlayer[0];
        scope.posterElem = scope.posterImage[0];
        scope.canvasContext = null;
        scope.progress = 0;
        scope.downloaded = 0;
        scope.progressParent = null;
        scope.progressBar = null;
        scope.downloadBar = null;
        scope.progressBarContainerWidth = 0;
        scope.totalDownloaded = 0;
        scope.duration = 0;
        scope.currentTime = 0;
        scope.timecode = "";
        scope.timecodeText = null;

        // Video Event Handers

        // Video complete event handler
        scope.videoPlayer.bind('ended', function (e) {
          scope.videoPlayer.addClass('hidden');
          scope.posterImage.removeClass('hidden');
          scope.downloadBar.addClass('hidden');
        });

        // Video volume change event handler
        scope.videoPlayer.bind('volumechange', function (e) {
          console.log('scope.muted: ' + scope.vidElem.muted);
        });

        // Video playback update handler
        scope.videoPlayer.bind('timeupdate', function (e) {

          if (scope.progressBar === null) {
            scope.progressBar = $('#progressBar');
          }

          if (scope.timecodeText === null) {
            scope.timecodeText = $('#timecodeText');
          }

          var progressValue = Math.floor((e.srcElement.currentTime / e.srcElement.duration) * 100);

          scope.progress = progressValue;

          scope.duration = secondsToHms(scope.vidElem.duration);
          scope.currentTime = secondsToHms(scope.vidElem.currentTime);
          scope.timecode =  scope.currentTime + " / " + scope.duration;

          scope.progressBar.attr('style', 'width:' + scope.progress + '%');
          scope.timecodeText.text(scope.timecode);

          if(progressValue > 0){
            scope.downloadBar.removeClass('hidden');
          }

          if(videoIsInViewport == true){
            scope.showHeroVideo();
          }else{
            scope.hideHeroVideo();
          }

        });

        // Video download progress handler
        scope.videoPlayer.bind('progress', function (e) {

          if(scope.downloadBar === null) {
            scope.downloadBar = $('#downloadBar');
          }

          if (scope.progressParent === null) {
            scope.progressParent = $('#progressParent');
          }

          try {
            var downloadValue = Math.floor((e.srcElement.buffered.end(0) / e.srcElement.duration) * 100);

            scope.downloaded = downloadValue;

            scope.downloadBar.attr('style', 'width:' + scope.downloaded + '%');

          } catch (e) {}

        });

        $(window).on('scroll',function () {
          if(scope.vidElem !== undefined && scope.vidElem !== null){
            videoIsInViewport = isElementInViewport(scope.vidElem);
          }
        });

        // Video Control Functions

        // Start video playback
        scope.playVideo = function () {
          scope.posterImage.addClass('hidden');
          scope.videoPlayer.removeClass('hidden');

          scope.vidElem.play();

          var videoElement = scope.vidElem;

          scope.videoStarted({videoElement: videoElement});
        };

        // Pause video playback
        scope.pauseVideo = function () {
          scope.vidElem.pause();

          scope.videoPaused();
        } ;

        // Mute video
        scope.muteVideo = function () {
          scope.vidElem.muted = true;
        };

        // Unmute video
        scope.unmuteVideo = function () {
          scope.vidElem.muted = false;
        };

        // Handle click event on the progress bar
        scope.handleProgressClick = function (event) {

          if(scope.progressBarContainerWidth === 0){
            scope.progressBarContainerWidth = event.currentTarget.clientWidth;
          }

          var percentWidth, percentTime;

          percentWidth = Math.round((event.offsetX / scope.progressBarContainerWidth) * 100);
          percentTime = Math.round((percentWidth / 100) * scope.vidElem.duration);

          try {
            scope.vidElem.currentTime = percentTime;
          } catch (e) {}

        };

        // Utility Functions

        var secondsToHms = function secondsToHms(d) {
          d = Number(d);
          var h = Math.floor(d / 3600);
          var m = Math.floor(d % 3600 / 60);
          var s = Math.floor(d % 3600 % 60);
          return ((h > 0 ? h + ":" : "") + (m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : "0:") + (s < 10 ? "0" : "") + s);
        };

        function isElementInViewport(el) {
          var rect = el.getBoundingClientRect();

          console.log(rect)

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
