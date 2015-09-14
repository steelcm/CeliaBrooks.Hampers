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
        .when('/payment', {
            templateUrl: 'pages/payment.html',
            controller: 'paymentController'
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
hamperApp.controller('paymentController', function ($scope) {
    addBackdrop();
    var clientToken = "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI0MmJjM2ViYmU5MDJmMTgzMWZkZTc4MjI5OWQ3OGE1MGI5OGUzNjZiNGZlNjRiNjhjNGQ0NGMyYzdmZDVkOWY2fGNyZWF0ZWRfYXQ9MjAxNS0wOS0xNFQxNzoyNzo0MS4yOTk3MjYyMzMrMDAwMFx1MDAyNm1lcmNoYW50X2lkPTM0OHBrOWNnZjNiZ3l3MmJcdTAwMjZwdWJsaWNfa2V5PTJuMjQ3ZHY4OWJxOXZtcHIiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzM0OHBrOWNnZjNiZ3l3MmIvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIn0sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsInRocmVlRFNlY3VyZSI6eyJsb29rdXBVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi90aHJlZV9kX3NlY3VyZS9sb29rdXAifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjpmYWxzZSwibWVyY2hhbnRBY2NvdW50SWQiOiJhY21ld2lkZ2V0c2x0ZHNhbmRib3giLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifSwiY29pbmJhc2VFbmFibGVkIjpmYWxzZSwibWVyY2hhbnRJZCI6IjM0OHBrOWNnZjNiZ3l3MmIiLCJ2ZW5tbyI6Im9mZiJ9";
    braintree.setup(clientToken, "dropin", {
        container: "payment-form"
    });
});
