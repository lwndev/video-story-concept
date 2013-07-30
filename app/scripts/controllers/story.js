'use strict';

angular.module('storyConceptApp')
  .controller('StoryCtrl', function ($scope, $routeParams, VideoFactory) {
    $scope.video = VideoFactory.get({videoId: $routeParams.storyId}, function (service) {
      $scope.video.title = service.title;
      $scope.video.description = service.description;
      $scope.video.imageSrc = service.imgSrc;
      $scope.video.videoSrc = service.vidSrc;
    });

    $scope.floatPlayerVisible = false;

    $scope.videoStarted = function (videoElement) {
      console.log('video started');
      console.log('videoElement:' + videoElement);
      $scope.setVideoSource(videoElement);
    };

    $scope.videoEnded = function () {
      console.log('video ended');
    };

    $scope.showHeroVideo = function () {

      console.log('show hero video');

      if($scope.floatPlayerVisible == true){
        $scope.floatPlayerStopDraw();
        $scope.hideFooter();
        $scope.floatPlayerVisible = false;
      }
    };

    $scope.hideHeroVideo = function () {

      console.log('hide hero video');

      if($scope.floatPlayerVisible == false){
        $scope.floatPlayerDraw();
        $scope.showFooter();
        $scope.floatPlayerVisible = true;
      }

    };

    $scope.hideFooter = function() {
      $('#vidMirror').height(0);
    }

    $scope.showFooter = function() {
      $('#vidMirror').height(180);
    }

    $scope.hideFooter();
  });
