'use strict';

describe('Directive: videoControlFullscreen', function () {
  beforeEach(module('storyConceptApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<video-control-fullscreen></video-control-fullscreen>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the videoControlFullscreen directive');
  }));
});
