'use strict';

describe('Controller: StoryCtrl', function () {

  // load the controller's module
  beforeEach(module('storyConceptApp'));

  var StoryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StoryCtrl = $controller('StoryCtrl', {
      $scope: scope
    });
  }));

});
