'use strict';

describe('Directive: videoControlPlayPauseButton', function () {
  beforeEach(module('storyConceptApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<video-control-play-pause-button></video-control-play-pause-button>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the videoControlPlayPauseButton directive');
  }));
});
