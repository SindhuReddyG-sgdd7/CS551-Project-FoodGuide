var smartEatingApp = angular.module('starter', ['ionic'])

smartEatingApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

smartEatingApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

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
  
    .state('Home', {
      url: '/home',    
      templateUrl: 'templates/Home.html',
      controller: 'HomeController'      
    });

    $urlRouterProvider.otherwise('/login');

    });

    smartEatingApp.controller("RegistrationController", function($scope,$http, $state, $httpParamSerializerJQLike) {
    
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
            url : 'https://api.mlab.com/api/1/databases/test1/collections/users?apiKey=EGAP5ndZR-TtwcytcnEZBQ-NH6PVDoiI',
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
            $scope.lastname ="";
            $scope.mobilenumber ="";
            $scope.username ="";

            $scope.firstname ="User created successfully";
            $state.go("Login");
                })
        .error(function() {
            alert("error");
            $state.go("Login");
    })
     }    
    });

    smartEatingApp.controller("LoginController", function($scope,$http, $state, $httpParamSerializerJQLike,$q) {
    console.log("Login");
     
    
     $scope.login = function(username, password) {
              
        console.log("inside login function");
        $http({
            type: "GET",
            url : 'https://api.mlab.com/api/1/databases/test1/collections/users?q={username:\''+username+'\'}&apiKey=EGAP5ndZR-TtwcytcnEZBQ-NH6PVDoiI',
           
            contentType: "application/json"
        })
        .success(function(data){
            // alert(data[0]._id.$oid);
            console.log(data);
            if(data==""){
                alert("No user exists with username: "+username);
                        $state.go("Login");
            }else{
                
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
        alert("Login Succesful!")
                  $state.go("Home");
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

    smartEatingApp.controller("HomeController", function($scope,$http, $state, $httpParamSerializerJQLike) {
    console.log("home");
    
        $scope.venueList = new Array();
        $scope.mostRecentReview;
    
    $scope.getSuggestion = function () {
        var myInput = document.getElementById('txt_searchFilter')
            var config = {
                'limit': 10,
                'maxDescChars': 150,
            };
    
    var picker = KGSearchWidget('AIzaSyBh0rmcI9zU8VhQq_JjX6TPSzNWrsCq4GI', myInput, config);
    console.log("home1");
    }
        $scope.getVenues = function () {
            console.log("home2");
            var placeEntered = document.getElementById("txt_placeName").value;
            var searchQuery = document.getElementById("txt_searchFilter").value;
            if (placeEntered != null && placeEntered != "" && searchQuery != null && searchQuery != "") {
                document.getElementById('div_ReviewList').style.display = 'none';
                //This is the API that gives the list of venues based on the place and search query.
                var handler = $http.get("https://api.foursquare.com/v2/venues/search" +
                    "?client_id=Q0ENF1YHFTNPJ31DCF13ALLENJW0P5MTH13T1SA0ZP1MUOCI" +
                    "&client_secret=ZH4CRZNEWBNTALAE3INIB5XG0QI12R4DT5HKAJLWKYE1LHOG" +
                    "&v=20160215&limit=5" +
                    "&near=" + placeEntered +
                    "&query=" + searchQuery);
                //https://api.foursquare.com/v2/venues/search?ll=40.7,-74&oauth_token=PWEEHVUCPOFMUZ0WOU0TYHXF3WD2AXY5PZ1ISNZIWTSDBE2C&v=20160913");

                handler.success(function (data) {

                    if (data != null && data.response != null && data.response.venues != undefined && data.response.venues != null) {
                        for (var i = 0; i < data.response.venues.length; i++) {
                            $scope.venueList[i] = {
                                "name": data.response.venues[i].name,
                                "id": data.response.venues[i].id,
                                "location": data.response.venues[i].location
                            };
                        }
                    }
                    console.log(data);

                })
                handler.error(function (data) {
                    alert("There was some error processing your request. Please try after some time.");
                });
            }
        }
        $scope.getMenu = function (venueSelected) {
            if (venueSelected != null) {
                //This is the API call being made to get the reviews(tips) for the selected place or venue.
                var handler = $http.get("https://api.foursquare.com/v2/venues/" + venueSelected.id + "/menu?oauth_token=PWEEHVUCPOFMUZ0WOU0TYHXF3WD2AXY5PZ1ISNZIWTSDBE2C&v=20160913");
    console.log(venueSelected.id);
                handler.success(function (result) {
                    if (result != null && result.response != null && result.response.menu != null &&
                        result.response.menu.menus.items != null) {
                        $scope.AllEntries = result.response.menu.menus.items[0].entries;
                        $scope.result = [];
                        for (var i=0; i<$scope.AllEntries.count;i++){
                            //do something
                            console.log(i);
                            $scope.result.push($scope.AllEntries.items[i].name);
                        }

                    $scope.MenuList = {"Menu" : $scope.result,
                    "venueID": venueSelected.id};

                        console.log($scope.MenuList.venueID);
                    console.log($scope.result);
                        document.getElementById('div_Menu').style.display = 'block';
                        document.getElementById('div_ReviewList').style.display = 'none';

                    }
                })
                handler.error(function (result) {
                    alert("There was some error processing your request. Please try after some time.")
                })
            }

        }

        $scope.getItems = function (venueSelected, menuSelected) {
            if (venueSelected != null) {
                //This is the API call being made to get the reviews(tips) for the selected place or venue.
                var handler = $http.get("https://api.foursquare.com/v2/venues/" + venueSelected + "/menu?oauth_token=PWEEHVUCPOFMUZ0WOU0TYHXF3WD2AXY5PZ1ISNZIWTSDBE2C&v=20160913");

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
                                }
                            }
                        }

                        $scope.ItemsList = {"reviewText" : $scope.result };

                        console.log(menuSelected);
                        console.log($scope.result);
                        document.getElementById('div_ItemList').style.display = 'block';
                        document.getElementById('div_ReviewList').style.display = 'none';

                    }
                })
                handler.error(function (result) {
                    alert("There was some error processing your request. Please try after some time.")
                })
            }

        }


        $scope.getReviews = function (venueSelected) {
            if (venueSelected != null) {
                //This is the API call being made to get the reviews(tips) for the selected place or venue.
                var handler = $http.get("https://api.foursquare.com/v2/venues/" + venueSelected.id + "/tips" +
                    "?sort=recent" +
                    "&client_id=Q0ENF1YHFTNPJ31DCF13ALLENJW0P5MTH13T1SA0ZP1MUOCI" +
                    "&client_secret=ZH4CRZNEWBNTALAE3INIB5XG0QI12R4DT5HKAJLWKYE1LHOG&v=20160215" +
                    "&limit=5");
                handler.success(function (result) {
                    if (result != null && result.response != null && result.response.tips != null &&
                        result.response.tips.items != null) {
                        $scope.mostRecentReview = result.response.tips.items[0];
                        //This is the Alchemy API for getting the sentiment of the most recent review for a place.
                        var callback = $http.get("http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment" +
                            "?apikey=d0e7bf68cdda677938e6c186eaf2b755ef737cd8" +
                            "&outputMode=json&text=" + $scope.mostRecentReview.text);
                        callback.success(function (data) {
                            if(data!=null && data.docSentiment!=null)
                            {
                                $scope.ReviewWithSentiment = {"reviewText" : $scope.mostRecentReview.text,
                                    "sentiment":data.docSentiment.type,
                                    "score":data.docSentiment.score  };
                                document.getElementById('div_ReviewList').style.display = 'block';
                                document.getElementById('div_Menu').style.display = 'none';


                            }
                        })
                    }
                })
                handler.error(function (result) {
                    alert("There was some error processing your request. Please try after some time.")
                })
            }

        }

    });
