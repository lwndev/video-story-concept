'use strict';

describe('Directive: videoPlaybackInfoDisplay', function () {
  beforeEach(module('storyConceptApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<video-playback-info-display></video-playback-info-display>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the videoPlaybackInfoDisplay directive');
  }));
});
