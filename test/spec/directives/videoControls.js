'use strict';

describe('Directive: videoControls', function () {
  beforeEach(module('storyConceptApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<video-controls></video-controls>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the videoControls directive');
  }));

  it('should have a play-pause toggle control', inject(function ($rootScope, $compile) {
    element = angular.element('<video-controls></video-controls>');
    element = $compile(element)($rootScope);
    expect(element.find('video-control-play-pause-button'));
  }));

  it('should have a timecode control', inject(function ($rootScope, $compile) {
    element = angular.element('<video-controls></video-controls>');
    element = $compile(element)($rootScope);
    expect(element.find('video-control-timecode-display'));
  }));

  it('should have a audio control', inject(function ($rootScope, $compile) {
    element = angular.element('<video-controls></video-controls>');
    element = $compile(element)($rootScope);
    expect(element.find('video-control-audio'));
  }));

  it('should have a fullscreen control', inject(function ($rootScope, $compile) {
    element = angular.element('<video-controls></video-controls>');
    element = $compile(element)($rootScope);
    expect(element.find('video-control-fullscreen'));
  }));
});
