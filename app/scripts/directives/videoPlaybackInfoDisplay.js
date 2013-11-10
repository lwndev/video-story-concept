'use strict';

angular.module('storyConceptApp')
  .directive('videoPlaybackInfoDisplay', function () {
    return {
      templateUrl: 'templates/videoPlaybackInfoDisplay.html',
      restrict: 'E',
      link: function postLink(scope, element) {
        element.text('this is the videoPlaybackInfoDisplay directive');
      }
    };
  });
