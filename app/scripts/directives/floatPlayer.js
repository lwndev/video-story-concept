'use strict';

angular.module('storyConceptApp')
  .directive('floatPlayer', function () {
    return {
      templateUrl: '/templates/floatPlayer.html',
      replace: true,
      restrict: 'E',
      link: function postLink(scope, element) {
        scope.canvas = element;
        scope.canvasElem = scope.canvas[0];
        scope.canvasContext = scope.canvasElem.getContext('2d');
        scope.vidSource = null;

        var paintTimeout = null;

        scope.setVideoSource = function(thingy) {
          scope.vidSource = thingy;
        };

        scope.floatPlayerDraw = function () {
          paintVideoToCanvas();
        };

        scope.floatPlayerStopDraw = function() {
          stopVideoCanvasPaint();
        };

        var paintVideoToCanvas = function () {
          if(scope.vidSource !== null){
            if(scope.vidSource.paused || scope.vidSource.ended) {
              return false;
            }
            scope.canvasContext.drawImage(scope.vidSource,0,0,320,180);
            paintTimeout = setTimeout(paintVideoToCanvas, 20);
          }
        };

        var stopVideoCanvasPaint = function() {
          clearTimeout(paintTimeout);
        };

      }
    };
  });
