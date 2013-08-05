'use strict';

angular.module('storyConceptApp')
  .directive('videoPlaybackInfoDisplay', function () {
    return {
      templateUrl: '/templates/videoPlaybackInfoDisplay.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the videoPlaybackInfoDisplay directive');
      }
    };
  });
