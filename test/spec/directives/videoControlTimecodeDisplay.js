'use strict';

describe('Directive: videoControlTimecodeDisplay', function () {
  beforeEach(module('storyConceptApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<video-control-timecode-display></video-control-timecode-display>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the videoControlTimecodeDisplay directive');
  }));
});
