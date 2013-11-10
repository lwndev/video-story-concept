'use strict';

angular.module('storyConceptApp')
  .directive('videoStory', function () {
    return {
      templateUrl: 'templates/videoStory.html',
      replace: true,
      restrict: 'E'
    };
  });
