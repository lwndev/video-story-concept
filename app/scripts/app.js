'use strict';

angular.module('storyConceptApp', ['ngResource'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
          redirectTo: '/story/back-and-forth'
      })
      .when('/story/:storyId', {
        templateUrl: 'views/story.html',
        controller: 'StoryCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
