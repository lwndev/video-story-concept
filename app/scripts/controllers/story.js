'use strict';

angular.module('storyConceptApp')
  .controller('StoryCtrl', function ($scope, $routeParams, VideoFactory) {

    $scope.videoIsPlaying;
    $scope.videoIsMuted;
    $scope.videoTimecodeValue;
    $scope.videoTimecodeText;
    $scope.currentCuePoint = null;
    $scope.floatPlayerVisible = false;


    $scope.video = VideoFactory.get({videoId: $routeParams.storyId}, function (service) {
      $scope.video.title = service.title;
      $scope.video.description = service.description;
      $scope.video.imageSrc = service.imgSrc;
      $scope.video.videoSrc = service.vidSrc;
      $scope.video.cuepoints = service.cuepoints;
      $scope.video.hasCuepoints = ($scope.video.cuepoints !== undefined && $scope.video.cuepoints !== null);
    });


    $scope.videoStarted = function (videoElement) {
      console.log('video started');
      console.log('videoElement:' + videoElement);
      $scope.setVideoSource(videoElement);
    };

    $scope.videoEnded = function () {
      console.log('video ended');
    };

    $scope.videoUpdate = function (currentTime, duration) {

      if($scope.video.hasCuepoints){

        console.log('currentTime:' + Math.floor(currentTime));
        console.log('duration:' + Math.floor(duration));

        var currentTimeToFixed = Math.floor(currentTime);
        var durationToFixed = Math.floor(duration);

        if($scope.currentCuePoint !== null){
          for(var i = 0; i < $scope.video.cuepoints.length; i++){
            $scope.hmsToSeconds($scope.video.cuepoints[i].timecode);
            if(currentTimeToFixed === $scope.hmsToSeconds($scope.video.cuepoints[i].timecode)){
              $scope.$apply(function(){ $scope.currentCuePoint = $scope.video.cuepoints[i]  });
            }
          }
        }else{
          if(currentTimeToFixed === $scope.hmsToSeconds($scope.video.cuepoints[0].timecode)){
            $scope.$apply(function(){ $scope.currentCuePoint = $scope.video.cuepoints[0] });
          }
        }

        if($scope.currentCuePoint !== null){
          console.log("$scope.currentCuePoint:" + $scope.currentCuePoint.timecode);
        }

        if(videoIsInViewport == true){
          $scope.showHeroVideo();
        }else{
          $scope.hideHeroVideo();
        }

      }
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
      $scope.$apply(function(){ $scope.floatPlayerVisible = false } );
    }

    $scope.showFooter = function() {
      $scope.$apply(function(){ $scope.floatPlayerVisible = true } );
    }

    $scope.hmsToSeconds = function (hms) {
      var h = parseInt(hms.split(":")[0]) * 3600;
      var m = parseInt(hms.split(":")[1]) * 60;
      var s = parseInt(hms.split(":")[2]);

      return h + m + s;
    };

    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();

      return (
        rect.bottom >= (rect.height / 3) &&
          rect.left >= 0 &&
          rect.height <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.width <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
  });
