var smartEatingApp = angular.module('starter', ['ionic'])

smartEatingApp.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

smartEatingApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('Home', {
        url: '/home',
        templateUrl: 'templates/Home.html',
        controller: 'HomeController'
    })
    
    .state('Login', {
        url: '/login',
        templateUrl: 'templates/Login.html',
        controller: 'LoginController'
    })

    .state('Register', {
        url: '/register',
        templateUrl: 'templates/Registration.html',
        controller: 'RegistrationController'
    })

    .state('LoginHome', {
        url: '/loginHome',
        templateUrl: 'templates/LoginHome.html',
        controller: 'LoginHomeController'
    })

    .state('RestaurantSearch', {
        url: '/restaurantSearch',
        templateUrl: 'templates/RestaurantSearch.html',
        controller: 'RestaurantSearchCntrlr'
    })

    .state('RestaurantDetails', {
        url: '/restaurantDetails',
        templateUrl: 'templates/RestaurantDetails.html',
        controller: 'RestaurantDetailsController'
    })

    .state('RecipeSearch', {
        url: '/recipeSearch',
        templateUrl: 'templates/RecipeSearch.html',
        controller: 'RecipeSearchController'
    })
    
    .state('Allergic', {
        url: '/allergic',
        templateUrl: 'templates/Allergic.html',
        controller: 'AllergicController'
    })
    
    .state('Translate', {
        url: '/translate',
        templateUrl: 'templates/Translate.html',
        controller: 'TranslateController'
    })
    
    .state('AboutUs', {
        url: '/aboutUs',
        templateUrl: 'templates/AboutUs.html',
        controller: 'AboutUsController'
    })
    
    .state('UpdatePassword', {
        url: '/updatePassword',
        templateUrl: 'templates/UpdatePassword.html',
        controller: 'UpdatePasswordController'
    })
    
    
    $urlRouterProvider.otherwise('/login');

});

smartEatingApp.controller("HomeController", function($scope, $http, $state, $httpParamSerializerJQLike) {
    
});
    
smartEatingApp.controller("RegistrationController", function($scope, $http, $state, $httpParamSerializerJQLike) {

    console.log("Register");
    $scope.createUser = function() {
        console.log("inside login function");
        var firstname = document.getElementById("firstname").value;
        var lastname = document.getElementById("lastname").value;
        var mobilenumber = document.getElementById("mobilenumber").value;
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;

        $http({
                method: 'POST',
                url: 'https://api.mlab.com/api/1/databases/smart-eating/collections/users?apiKey=EGAP5ndZR-TtwcytcnEZBQ-NH6PVDoiI',
                data: JSON.stringify({
                    firstname: firstname,
                    lastname: lastname,
                    mobilenumber: mobilenumber,
                    username: username,
                    password: password
                }),
                contentType: "application/json"
            }).success(function() {
                alert("Successfully Registered!");
                $scope.lastname = "";
                $scope.mobilenumber = "";
                $scope.username = "";

                $scope.firstname = "User created successfully";
                $state.go("Login");
            })
            .error(function() {
                alert("error");
                $state.go("Login");
            })
    }
});

smartEatingApp.controller("LoginController", function($scope, $http, $state, $httpParamSerializerJQLike, $q) {
    console.log("Login");


    $scope.login = function(username, password) {

        console.log("inside login function");
        $http({
                type: "GET",
                url: 'https://api.mlab.com/api/1/databases/smart-eating/collections/users?q={username:\'' + username + '\'}&apiKey=EGAP5ndZR-TtwcytcnEZBQ-NH6PVDoiI',

                contentType: "application/json"
            })
            .success(function(data) {
                // alert(data[0]._id.$oid);
                console.log(data);
                if (data == "") {
                    alert("No user exists with username: " + username);
                    $state.go("Login");
                } else {

                    if (username == data[0].username && password == data[0].password) {
                        // localStorage.setItem("name" , username);

                        /*var User = (function () {
  // Instance stores a reference to the Singleton
  var instance;

  function init() {
    // Singleton
    // Private methods and variables
    function privateMethod(){
        console.log( "I am logged in" );
    }

    var privateVariable = "I am also logged in";

    return {
      // Public methods
      fullName: function () {
        return instance.firstName +" "+instance.lastName;
      },
      //Public Properties
      firstName : "Sindhu",
      lastName : "Golconda"
    };
  };

  return {
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function () {
      if ( !instance ) {
        instance = init();
      }
      return instance;
    }
  };
})(); */
                        alert("Login Succesful!");
                        localStorage.UserName = username;
                        $state.go("LoginHome");
                    } else {
                        alert("Incorrect username or password");
                        $state.go("Login");
                    }
                }
            })
    }


    $scope.register = function() {
        $state.go("Register");
    }

});

smartEatingApp.controller("LoginHomeController", function($scope, $http, $state, $httpParamSerializerJQLike, $q) {
    $scope.openNav = function() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    $scope.closeNav = function() {
        document.getElementById("mySidenav").style.width = "0";
    }

    $scope.RedirectHome = function() {
        $state.go("LoginHome");
    }
    
    $scope.Restaurant = function() {
        $state.go("RestaurantSearch");
    }

    $scope.Recipe = function() {
        $state.go("RecipeSearch");
    }

    $scope.Allergic = function() {
        $state.go("Allergic");
    }

    $scope.Translate = function() {
        $state.go("Translate");
    }

    $scope.AboutUs = function() {
        $state.go("AboutUs");
    }

    $scope.ChangePassword = function() {
        $state.go("UpdatePassword");
    }

    $scope.Logout = function() {
        $state.go("LoginHome");
    }

});

smartEatingApp.controller("RecipeSearchController", function($scope, $http, $state, $httpParamSerializerJQLike) {
console.log("AS");
    $scope.openNav = function() {
        console.log("abc");
        document.getElementById("mySidenav").style.width = "250px";
        console.log("really");
    }

    $scope.closeNav = function() {
        document.getElementById("mySidenav").style.width = "0";
    }

    $scope.RedirectHome = function() {
        $state.go("LoginHome");
    }
    
    $scope.Restaurant = function() {
        $state.go("RestaurantSearch");
    }

    $scope.Recipe = function() {
        $state.go("RecipeSearch");
    }

    $scope.Allergic = function() {
        $state.go("Allergic");
    }

    $scope.Translate = function() {
        $state.go("Translate");
    }

    $scope.AboutUs = function() {
        $state.go("AboutUs");
    }

    $scope.ChangePassword = function() {
        $state.go("UpdatePassword");
    }

    $scope.Logout = function() {
        $state.go("LoginHome");
    }

    $scope.getRecipes = function() {

        $scope.recipeList = new Array();
        var itemEntered = document.getElementById("txt_Item").value;
        if (itemEntered != null && itemEntered != "") {

            //This is the API that gives the list of venues based on the place and search query.
            var handler = $http.get("https://api.edamam.com/search?q=" + itemEntered + "&app_id=c009d437&app_key=6b01ffc1fdadadcb3b037b136b55549b");

            handler.success(function(data) {
                if (data != null && data.hits != null) {
                    console.log("a");
                    for (var i = 0; i < data.hits.length; i++) {
                        console.log(i);
                        $scope.recipeList[i] = {
                            "image": data.hits[i].recipe.image,
                            "name": data.hits[i].recipe.label,
                            "ingredients": data.hits[i].recipe.ingredientLines,
                            "process": data.hits[i].recipe.url
                        };
                    }

                    document.getElementById('div_RecipeList').style.display = 'block';
                }
            })
            handler.error(function(data) {
                alert("There was some error processing your request. Please try after some time.");
            });
        }
    }

    $scope.recipeDetails = function(recipe) {

        if (recipe != null && recipe != "") {
            console.log(recipe);
            //This is the API that gives the list of venues based on the place and search query.
            $scope.recipeDetails = recipe;

            document.getElementById('div_RecipeList').style.display = 'none';
            document.getElementById('div_RecipeDetails').style.display = 'block';
            document.getElementById('div_SearchContainer').style.display = 'none';

        };
    }
    $scope.back = function() {
        document.getElementById('div_RecipeList').style.display = 'block';
        document.getElementById('div_RecipeDetails').style.display = 'none';
        document.getElementById('div_SearchContainer').style.display = 'block';
    }
});

smartEatingApp.controller("RestaurantSearchCntrlr", function($scope, $http, $state, $httpParamSerializerJQLike) {

    $scope.openNav = function() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    $scope.closeNav = function() {
        document.getElementById("mySidenav").style.width = "0";
    }

    $scope.RedirectHome = function() {
        $state.go("LoginHome");
    }
    
    $scope.Restaurant = function() {
        $state.go("RestaurantSearch");
    }

    $scope.Recipe = function() {
        $state.go("RecipeSearch");
    }

    $scope.Allergic = function() {
        $state.go("Allergic");
    }

    $scope.Translate = function() {
        $state.go("Translate");
    }

    $scope.AboutUs = function() {
        $state.go("AboutUs");
    }

    $scope.ChangePassword = function() {
        $state.go("UpdatePassword");
    }

    $scope.Logout = function() {
        $state.go("LoginHome");
    }

    var accomodationPlace;
    var autocomplete;
    var accomodationMapOptions = {
        zoom: 3,
        center: new google.maps.LatLng(39, 3),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    $scope.map = new google.maps.Map(document.getElementById('accomodationMap'), accomodationMapOptions);

    function accomodationSetMarker(lati, longi) {
        accomodationMapOptions = {
            zoom: 12,
            center: new google.maps.LatLng(lati, longi),
            mapTypeId: google.maps.MapTypeId.ROADMAP

        }
        console.log("map");
        $scope.map = new google.maps.Map(document.getElementById('accomodationMap'), accomodationMapOptions);
    }
    $scope.map = new google.maps.Map(document.getElementById('accomodationMap'), accomodationMapOptions);
    $scope.accomodationMarkers = [];
    var infoWindow = new google.maps.InfoWindow();

    function createMarker(info) {
        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.location.lat, info.location.lng),
            title: info.name,
            //icon:iconBase + 'img/accomodation_marker.png'
        });

        google.maps.event.addListener(marker, 'mousedown', function() {
            //infoWindow.setContent('<a href="/www/index.html#/restaurantDetails">' + marker.title + '</a>');
            infoWindow.setContent('<a href="file:///android_asset/www/index.html#/restaurantDetails">' + marker.title + '</a>');
            infoWindow.open($scope.map, marker);
            localStorage.RestaurantID = info.id;
            localStorage.RestaurantName = info.name;
            console.log("Info");
            console.log(info.id);
            console.log(localStorage.RestaurantID);
        });
        $scope.accomodationMarkers.push(marker);
    }
    $scope.openInfoWindow = function(e, selectedMarker) {
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }
    var placeEntered = document.getElementById('txt_placeName');
    var searchQuery = document.getElementById('txt_searchFilter');
    autocomplete = new google.maps.places.Autocomplete(placeEntered);
    console.log("Place - "+ placeEntered);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        accomodationPlace = autocomplete.getPlace();
        var latitude = accomodationPlace.geometry.location.lat();
        var longitude = accomodationPlace.geometry.location.lng();
        accomodationSetMarker(latitude, longitude);
    });



    $scope.getVenues = function() {
        accomodationPlace = autocomplete.getPlace();
        console.log("a--1");
        var placeEntered = document.getElementById('txt_placeName').value;
        var searchQuery = document.getElementById('txt_searchFilter').value;

        
    console.log("Place - "+ placeEntered);
        
        if (placeEntered != null && placeEntered != "" && searchQuery != null && searchQuery != "") {
            console.log("b--2");
            $http.get("https://api.foursquare.com/v2/venues/search" +
                    "?client_id=Q0ENF1YHFTNPJ31DCF13ALLENJW0P5MTH13T1SA0ZP1MUOCI" +
                    "&client_secret=ZH4CRZNEWBNTALAE3INIB5XG0QI12R4DT5HKAJLWKYE1LHOG" +
                    "&v=20160215&limit=5" +
                    "&near=" + placeEntered +
                    "&query=" + searchQuery)
                .success(function(sourcedata) {
                    if (sourcedata != null && sourcedata.response != null && sourcedata.response.venues != undefined && sourcedata.response.venues != null) {
                        console.log("c--3");
                        for (var i = 0; i < sourcedata.response.venues.length; i++) {
                            createMarker(sourcedata.response.venues[i]);
                            console.log("d--4");
                        }
                        //document.getElementById("accomodationMap").innerHTML=content;
                        console.log(sourcedata);
                    }
                    console.log("e--5");
                });
        }
    };



    $scope.RedirectHome = function() {
        $state.go('LoginHome');
    };
})

smartEatingApp.controller("RestaurantDetailsController", function($scope, $http, $state, $httpParamSerializerJQLike) {
    
    $scope.openNav = function() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    $scope.closeNav = function() {
        document.getElementById("mySidenav").style.width = "0";
    }

    $scope.RedirectHome = function() {
        $state.go("LoginHome");
    }
    
    $scope.Restaurant = function() {
        $state.go("RestaurantSearch");
    }

    $scope.Recipe = function() {
        $state.go("RecipeSearch");
    }

    $scope.Allergic = function() {
        $state.go("Allergic");
    }

    $scope.Translate = function() {
        $state.go("Translate");
    }

    $scope.AboutUs = function() {
        $state.go("AboutUs");
    }

    $scope.ChangePassword = function() {
        $state.go("UpdatePassword");
    }

    $scope.Logout = function() {
        $state.go("LoginHome");
    }
    
    console.log(localStorage.RestaurantID.name);
    $scope.myFieldLabel = localStorage.RestaurantName;

    $scope.getReviews = function() {
        //This is the API call being made to get the reviews(tips) for the selected place or venue.
        var handler = $http.get("https://api.foursquare.com/v2/venues/" + localStorage.RestaurantID + "/tips" +
            "?sort=recent" +
            "&client_id=Q0ENF1YHFTNPJ31DCF13ALLENJW0P5MTH13T1SA0ZP1MUOCI" +
            "&client_secret=ZH4CRZNEWBNTALAE3INIB5XG0QI12R4DT5HKAJLWKYE1LHOG&v=20160215" +
            "&limit=5");
        handler.success(function(result) {
            if (result != null && result.response != null && result.response.tips != null &&
                result.response.tips.items != null) {
                $scope.mostRecentReview = result.response.tips.items[0];
                //This is the Alchemy API for getting the sentiment of the most recent review for a place.
                var callback = $http.get("http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment" +
                    "?apikey=d0e7bf68cdda677938e6c186eaf2b755ef737cd8" +
                    "&outputMode=json&text=" + $scope.mostRecentReview.text);
                callback.success(function(data) {
                    if (data != null && data.docSentiment != null) {
                        $scope.ReviewWithSentiment = {
                            "reviewText": $scope.mostRecentReview.text,
                            "sentiment": data.docSentiment.type,
                            "score": data.docSentiment.score
                        };
                        document.getElementById('div_ReviewList').style.display = 'block';
                        document.getElementById('div_Menu').style.display = 'none';
                    }
                })
            }
        })
        handler.error(function(result) {
            alert("There was some error processing your request. Please try after some time.")
        })


    }

    $scope.getMenu = function() {

        var handler = $http.get("https://api.foursquare.com/v2/venues/" + localStorage.RestaurantID + "/menu?oauth_token=PWEEHVUCPOFMUZ0WOU0TYHXF3WD2AXY5PZ1ISNZIWTSDBE2C&v=20160913");
        handler.success(function(result) {
            if (result != null && result.response != null && result.response.menu != null &&
                result.response.menu.menus.items != null) {
                $scope.AllEntries = result.response.menu.menus.items[0].entries;
                $scope.result = [];
                for (var i = 0; i < $scope.AllEntries.count; i++) {
                    //do something
                    console.log(i);
                    $scope.result.push($scope.AllEntries.items[i].name);
                }

                $scope.MenuList = {
                    "Menu": $scope.result,
                    "venueID": localStorage.RestaurantID
                };

                console.log($scope.MenuList.venueID);
                console.log($scope.result);
                document.getElementById('div_Menu').style.display = 'block';
                document.getElementById('div_ReviewList').style.display = 'none';

            }
        })
        handler.error(function(result) {
            alert("There was some error processing your request. Please try after some time.")
        })


    }
    
    $scope.getItems = function (menuSelected) {
            
        console.log("Restaurant ID - " + localStorage.RestaurantID);
        console.log("MENU - "+ menuSelected);
        var UserAllergies = "";
        
       /* $http({
                type: "GET",
                url: 'https://api.mlab.com/api/1/databases/smart-eating/collections/users?q={username:\'' + username + '\'}&apiKey=EGAP5ndZR-TtwcytcnEZBQ-NH6PVDoiI',

                contentType: "application/json"
            })
            .success(function(data) {
                // alert(data[0]._id.$oid);
                console.log(data);
                if (data == "") {
                    alert("No user exists with username: " + username);
                    $state.go("Login");
                } else {
                    UserAllergies = data[0].allergies;
                }
        });*/
                //This is the API call being made to get the reviews(tips) for the selected place or venue.
                var handler = $http.get("https://api.foursquare.com/v2/venues/" + localStorage.RestaurantID + "/menu?oauth_token=PWEEHVUCPOFMUZ0WOU0TYHXF3WD2AXY5PZ1ISNZIWTSDBE2C&v=20160913");

                handler.success(function (result) {
                    if (result != null && result.response != null && result.response.menu != null &&
                        result.response.menu.menus.items != null) {
                        $scope.AllEntries = result.response.menu.menus.items[0].entries;
                        $scope.result = [];
                        for (var i=0; i<$scope.AllEntries.count;i++){
                            //do something
                            if($scope.AllEntries.items[i].name == menuSelected) {
                                for (var j=0; i<$scope.AllEntries.items[i].entries.count;i++) {
                                    $scope.result.push($scope.AllEntries.items[i].entries.items[j].name);
                                    //$scope.getIngredients($scope.AllEntries.items[i].entries.items[j].name);
                                    
                                    
                                }
                            }
                        }

                        $scope.ItemsList = {"Items" : $scope.result};

                        document.getElementById('div_ItemList').style.display = 'block';
                        document.getElementById('ItemHeading').style.display = 'block';
                        $scope.headItem = menuSelected;
                        document.getElementById('div_ReviewList').style.display = 'none';

                    }
                })
                handler.error(function (result) {
                    alert("There was some error processing your request. Please try after some time.")
                })
        }
        
        $scope.getIngredients = function (ItemSelected) {
            if (ItemSelected != null) {
                
                console.log("ITEMSSS - "+ItemSelected);
                //This is the API call being made to get the reviews(tips) for the selected place or venue.
                var handler = $http.get("http://api.yummly.com/v1/api/recipes?_app_id=c58246b2&_app_key=b9c056cb169246eefccd1b588d913320&q="+ItemSelected+"&maxTotalTimeInSeconds=5400");

                handler.success(function (result) {
                    if (result != null && result.matches != null) {
                        $scope.AllEntries = result.matches[0].ingredients;
                        $scope.result = [];
                        $scope.result.push($scope.AllEntries);                        
                        $scope.IngredientsList = {"list" : $scope.result };
                        for(var i=0; i<$scope.AllEntries.count;i++) {
                            console.log("INGREDIENTS:"+$scope.AllEntries[i]);
                        }
                        
                        document.getElementById('div_IngredientsList').style.display = 'block';
                    }
                })
                handler.error(function (result) {
                    alert("There was some error processing your request. Please try after some time.")
                })
            }
        }


});

smartEatingApp.controller("AllergicController", function($scope, $http, $state, $httpParamSerializerJQLike) {
    $scope.openNav = function() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    $scope.closeNav = function() {
        document.getElementById("mySidenav").style.width = "0";
    }

    $scope.RedirectHome = function() {
        $state.go("LoginHome");
    }
    
    $scope.Restaurant = function() {
        $state.go("RestaurantSearch");
    }

    $scope.Recipe = function() {
        $state.go("RecipeSearch");
    }

    $scope.Allergic = function() {
        $state.go("Allergic");
    }

    $scope.Translate = function() {
        $state.go("Translate");
    }

    $scope.AboutUs = function() {
        $state.go("AboutUs");
    }

    $scope.ChangePassword = function() {
        $state.go("UpdatePassword");
    }

    $scope.Logout = function() {
        $state.go("LoginHome");
    }
    if(document.getElementById("Peanut").checked)
    {
            console.log(document.getElementById("Peanut").value);
    }
    
   
    $scope.AddAllergies = function(){
    
        var Allergies = "";
        
        if(document.getElementById("Dairy").checked)
        {
            Allergies = Allergies + "Dairy;";
        }
        
        if(document.getElementById("Eggs").checked)
        {
            Allergies = Allergies + "Eggs;";
        }
        
        if(document.getElementById("Glutten").checked)
        {
            Allergies = Allergies + "Glutten;";
        }
        
        if(document.getElementById("Wheat").checked)
        {
            Allergies = Allergies + "Wheat;";
        }
        
        if(document.getElementById("Peanut").checked)
        {
            Allergies = Allergies + "Peanut;";
        }
        
        if(document.getElementById("Sesame").checked)
        {
            Allergies = Allergies + "Sesame;";
        }
        
        if(document.getElementById("Seafood").checked)
        {
            Allergies = Allergies + "Seafood;";
        }
        
        $http({
                method: 'PUT',
                url: 'https://api.mlab.com/api/1/databases/smart-eating/collections/users?apiKey=EGAP5ndZR-TtwcytcnEZBQ-NH6PVDoiI&q={username:\''   + localStorage.UserName + '\'}',
                data: JSON.stringify({ "$set" :{
                allergies: Allergies
                }  }),
                contentType: "application/json"
            }).success(function() { 
                alert("Allergies added succefully!");
                $state.go("LoginHome");
            })
            .error(function() {
                alert("Error occured. Please try after some time!");
                $state.go("LoginHome");
            })
    }
    
});

smartEatingApp.controller("TranslateController", function($scope, $http, $state, $httpParamSerializerJQLike) {
    $scope.openNav = function() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    $scope.closeNav = function() {
        document.getElementById("mySidenav").style.width = "0";
    }

    $scope.RedirectHome = function() {
        $state.go("LoginHome");
    }

    $scope.Restaurant = function() {
        $state.go("RestaurantSearch");
    }

    $scope.Recipe = function() {
        $state.go("RecipeSearch");
    }

    $scope.Allergic = function() {
        $state.go("Allergic");
    }

    $scope.Translate = function() {
        $state.go("Translate");
    }

    $scope.AboutUs = function() {
        $state.go("AboutUs");
    }

    $scope.ChangePassword = function() {
        $state.go("UpdatePassword");
    }

    $scope.Logout = function() {
        $state.go("LoginHome");
    }

    $scope.sourcechanged = function() {
        document.getElementById("SourceText").value = "";
    }
    $scope.convertText = function() {
        console.log("TRANSLATE BEGINS");
        var SourceText = document.getElementById("SourceText").value.toString();
        console.log(SourceText);
        var SourceLanguage = document.getElementById("SourceLanguage");
        console.log(SourceLanguage);
        SourceLanguage = SourceLanguage.options[SourceLanguage.selectedIndex].value;
        console.log(SourceLanguage);
        $scope.sourceLang = SourceLanguage;
        var DestinationText = document.getElementById("DestinationText").value.toString();
        var DestinationLanguage = document.getElementById("DestinationLanguage");
        DestinationLanguage = DestinationLanguage.options[DestinationLanguage.selectedIndex].value;

        $http({
            method: 'GET',
            url: 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20151023T145251Z.bf1ca7097253ff7e.c0b0a88bea31ba51f72504cc0cc42cf891ed90d2&text=' + SourceText + '&lang=' + SourceLanguage + '-' + DestinationLanguage + '&[format=plain]&[options=1]&[callback=set]',
            contentType: "application/json"
        }).success(function(response) {
            $scope.convertedText = response.text;
            document.getElementById("lblDestinationText").style.display = 'block';
            document.getElementById("DestinationText").value = response.text;
        });
    };
});

smartEatingApp.controller("AboutUsController", function($scope, $http, $state, $httpParamSerializerJQLike) {
    $scope.openNav = function() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    $scope.closeNav = function() {
        document.getElementById("mySidenav").style.width = "0";
    }

    $scope.RedirectHome = function() {
        $state.go("LoginHome");
    }
    
    $scope.Restaurant = function() {
        $state.go("RestaurantSearch");
    }

    $scope.Recipe = function() {
        $state.go("RecipeSearch");
    }

    $scope.Allergic = function() {
        $state.go("Allergic");
    }

    $scope.Translate = function() {
        $state.go("Translate");
    }

    $scope.AboutUs = function() {
        $state.go("AboutUs");
    }

    $scope.ChangePassword = function() {
        $state.go("UpdatePassword");
    }

    $scope.Logout = function() {
        $state.go("LoginHome");
    }
});

smartEatingApp.controller("UpdatePasswordController", function($scope, $http, $state, $httpParamSerializerJQLike) {
    $scope.openNav = function() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    $scope.closeNav = function() {
        document.getElementById("mySidenav").style.width = "0";
    }

    $scope.RedirectHome = function() {
        $state.go("LoginHome");
    }
    
    $scope.Restaurant = function() {
        $state.go("RestaurantSearch");
    }

    $scope.Recipe = function() {
        $state.go("RecipeSearch");
    }

    $scope.Allergic = function() {
        $state.go("Allergic");
    }

    $scope.Translate = function() {
        $state.go("Translate");
    }

    $scope.AboutUs = function() {
        $state.go("AboutUs");
    }

    $scope.ChangePassword = function() {
        $state.go("UpdatePassword");
    }

    $scope.Logout = function() {
        $state.go("LoginHome");
    }
});