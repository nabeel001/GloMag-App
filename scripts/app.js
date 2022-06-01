var glomagApp = angular.module("glomagApp", ["ngRoute", "ngAnimate"]);

glomagApp.config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/home", {
        templateUrl: "views/home.html",
      })
      .when("/blogs", {
        templateUrl: "views/blogs.html",
        controller: "blogsCtrl",
      })
      .when("/create", {
        templateUrl: "views/create.html",
      })
      .otherwise({
        redirectTo: "/home",
      });
  },
]);

glomagApp.controller(
  "connectCtrl",
  function ($scope, $location, $anchorScroll) {
    $scope.scrollTo = function (id) {
      $location.hash(id);
      $anchorScroll();
    };
  }
);

glomagApp.controller("locationCtrl", ($scope) => {
  var x = document.getElementById("location");
  $scope.getLoc = function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition($scope.showPos);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  };
  $scope.showPos = function showPosition(position) {
    x.innerHTML =
      "Latitude: " +
      position.coords.latitude +
      "<br>Longitude: " +
      position.coords.longitude;
  };
});

glomagApp.controller("blogsCtrl", function ($scope, $http) {
  // console.log(angular.toJson($scope.blogs));
  $http.get("data/blogs.json").then(function (json_data) {
    $scope.blogs = json_data.data;
  });
});

// Text Editor Functionalities

function chooseColor() {
  var mycolor = document.getElementById("myColor").value;
  document.execCommand("foreColor", false, mycolor);
}

function changeFont() {
  var myFont = document.getElementById("input-font").value;
  document.execCommand("fontName", false, myFont);
}

function changeSize() {
  var mysize = document.getElementById("fontSize").value;
  document.execCommand("fontSize", false, mysize);
}

function checkDiv() {
  var editorText = document.getElementById("editor1").innerHTML;
  if (editorText === "") {
    document.getElementById("editor1").style.border = "5px solid red";
  }
}

function removeBorder() {
  document.getElementById("editor1").style.border = "1px solid transparent";
}
