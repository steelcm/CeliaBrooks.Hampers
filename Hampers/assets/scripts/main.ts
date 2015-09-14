var hamperApp = angular.module('hamperApp', ['ngRoute']);

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
    var modalBackdrop = document.createElement('div');
    modalBackdrop.setAttribute('class', 'modal-backdrop');
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


hamperApp.controller('homeController', function ($scope) {
    removeBackdrop();
});

hamperApp.controller('whyController', function ($scope) {
    addBackdrop();
});

hamperApp.controller('aboutController', function ($scope) {
    addBackdrop();
});
