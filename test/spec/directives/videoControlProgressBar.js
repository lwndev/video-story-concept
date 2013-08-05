'use strict';

describe('Directive: videoControlProgressBar', function () {
  beforeEach(module('storyConceptApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<video-control-progress-bar></video-control-progress-bar>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the videoControlProgressBar directive');
  }));
});
