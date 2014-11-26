angular.module("SurveyRoutes", [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/new', {
      controller: 'SurveyEditorPageController as pageCtrl',
      templateUrl : './survey-editor.html'
    });
    $routeProvider.when('/preview/:id', {
      templateUrl : './survey-preview.html'
    });
    $routeProvider.when('/', {
      templateUrl : './survey-index.html'
    });
    $routeProvider.when('/edit/:id',{
      controller: 'SurveyEditorPageController as pageCtrl',
      templateUrl : './survey-editor.html'
    });
    $routeProvider.otherwise({
      redirectTo: '/'
    });
  }])
