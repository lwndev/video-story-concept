'use strict';

describe('Directive: videoStory', function () {
  beforeEach(module('storyConceptApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<video-story></video-story>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the videoStory directive');
  }));
});
