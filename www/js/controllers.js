angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('QuestionnairesCtrl', function($scope, $http) {
  $http({
    method: 'GET',
    url: 'http://memories4me.herokuapp.com/api/questionnaires'
  }).then(function successCallback(response) {
    $scope.questionnaires = response.data;
  }, function errorCallback(response) {
    console.log(response);
  });
})

.controller('NewQuestionnaireCtrl', function($scope, $http) {

  $scope.questionnaire = {
    'title': '',
    'description': '',
    'created': new Date(),
    'creator': 1
  };

  $scope.submitNew = function() {
    console.log($scope.questionnaire);
  };
})

.controller('QuestionnaireCtrl', function($scope, $stateParams, $http) {
  $http({
    method: 'GET',
    url: 'http://memories4me.herokuapp.com/api/questions?filter={"where":{"questionnaireId":' + $stateParams.questionnaireId + '}}'
  }).then(function successCallback(response) {
    $scope.questions = response.data;
  }, function errorCallback(response) {
    console.log(response);
  });
});
