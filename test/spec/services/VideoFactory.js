'use strict';

describe('Service: VideoFactory', function () {

  // load the service's module
  beforeEach(module('storyConceptApp'));

  // instantiate service
  var VideoFactory;
  beforeEach(inject(function (_VideoFactory_) {
    VideoFactory = _VideoFactory_;
  }));

  it('should do something', function () {
    expect(!!VideoFactory).toBe(true);
  });

});
