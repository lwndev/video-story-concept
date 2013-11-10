'use strict';

angular.module('storyConceptApp')
  .directive('videoControlProgressBar', function () {
    return {
      scope: {
        seekToTime: '&',
        timeBarUpdate: '=',
        progressBarUpdate: '=',
        videoPlaybackEnded: '='
      },
      templateUrl: '/templates/videoControlProgressBar.html',
      restrict: 'E',
      link: function postLink(scope, element) {

        scope.progress = 0;
        scope.duration = 0;
        scope.progressValue = 0;
        scope.progressParent = element.children().children();
        scope.progressBar = $(scope.progressParent.children()[0]);
        scope.downloadBar =  $(scope.progressParent.children()[1]);
        scope.progressBarContainerWidth = 0;

        scope.$watch('timeBarUpdate', function (newValue) {

          if(newValue !== null && newValue !== undefined){
            var progressValue = Math.floor((newValue.currentTime / newValue.duration) * 100);

            scope.progress = progressValue;
            scope.duration = newValue.duration;

            scope.progressBar.attr('style', 'width:' + scope.progress + '%');
          }

        });

        // Listen for time update from the video playback
        scope.$watch('progressBarUpdate', function (newValue) {
          scope.downloadBar.attr('style', 'width:' + newValue.downloaded + '%');
        });

        // Handle click event on the progress bar
        scope.handleProgressClick = function (event) {

          if(scope.progressBarContainerWidth === 0){
            scope.progressBarContainerWidth = event.currentTarget.clientWidth;
          }

          var percentWidth, percentTime;

          percentWidth = Math.round((event.offsetX / scope.progressBarContainerWidth) * 100);
          percentTime = Math.round((percentWidth / 100) * scope.duration);

          try {
            scope.seekToTime({time: percentTime});
          } catch (e) {
            console.log('cannot seek to time');
          }

        };
      }
    };
  });
