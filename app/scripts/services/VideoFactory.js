'use strict';

angular.module('storyConceptApp')
  .factory('VideoFactory', function ($resource) {
    return $resource('assets/data/:videoId.json', {}, {
      query: {method:'GET', params:{videoId:'videos'}, isArray:true}
    });
  });
