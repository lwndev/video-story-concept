'use strict';

angular.module('storyConceptApp')
  .directive('videoControlTimecodeDisplay', function () {
    return {
      templateUrl: '/templates/videoControlTimecodeDisplay.html',
      scope: {
        videoControlTimecodeDisplay: '='
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
