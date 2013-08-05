'use strict';

describe('Directive: videoControlAudio', function () {
  beforeEach(module('storyConceptApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<video-control-audio></video-control-audio>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the videoControlAudio directive');
  }));
});
