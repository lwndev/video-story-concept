'use strict';

angular.module('storyConceptApp')
  .controller('MainCtrl', function ($scope, $routeParams, VideoFactory) {

    $scope.content = VideoFactory.query();

  });