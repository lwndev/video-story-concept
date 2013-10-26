'use strict';

angular.module('storyConceptApp', ['ngResource'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/story.html',
        controller: 'StoryCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
