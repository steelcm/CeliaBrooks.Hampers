var hamperApp = angular.module('hamperApp', ['ngRoute', 'ngAnimate']);

hamperApp.config(function ($routeProvider) {
    $routeProvider
        // index
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })
        // why
        .when('/why', {
            templateUrl: 'pages/why.html',
            controller: 'whyController'
        })
        // abouts 
        .when('/about', {
            templateUrl: 'pages/about.html',
            controller: 'aboutController'
        })
});

var addBackdrop = function () {
    var modalBackdrop = document.createElement('a');
    modalBackdrop.setAttribute('class', 'modal-backdrop');
    modalBackdrop.setAttribute('href', '/#/');
    document.body.appendChild(modalBackdrop);
}

var removeBackdrop = function () {
    var modalBackdrops = document.getElementsByClassName('modal-backdrop');
    if (modalBackdrops.length > 0) {
        for (var i = modalBackdrops.length - 1; i >= 0; i--) {
            if (modalBackdrops[i] && modalBackdrops[i].parentElement) {
                modalBackdrops[i].parentElement.removeChild(modalBackdrops[i]);
            }
        }
    }
}



var leftUrl = 'images/celia.jpg';
var rightUrl = 'images/hamper.jpg';

hamperApp.controller('homeController', function ($scope, $location) {
    removeBackdrop();
    // setup image
    var imageLeft = new Image();
    var imageRight = new Image();
    $scope.imageLeftLoaded = false;
    $scope.imageRightLoaded = false;
    // setup image onload event
    imageLeft.onload = function () {
        document.getElementById('background-img-left').style.backgroundImage = "url('" + leftUrl + "')";
        $scope.imageLeftLoaded = true;
        $scope.$apply();
    }
    imageRight.onload = function () {
        document.getElementById('background-img-right').style.backgroundImage = "url('" + rightUrl + "')";
        $scope.imageRightLoaded = true;
        $scope.$apply();
    }
    // load background image after view has loaded
    $scope.$on('$viewContentLoaded', function () {
        imageLeft.src = leftUrl;
        imageRight.src = rightUrl;
        if (imageLeft.complete) imageLeft.onload(null);
        if (imageRight.complete) imageRight.onload(null);
    });
});

hamperApp.controller('whyController', function ($scope) {
    addBackdrop();
});

hamperApp.controller('aboutController', function ($scope) {
    addBackdrop();
});
