var studyPreviewModule = angular.module("SurveyPreview", ['SurveyCommon'])

  .controller("SurveyPreviewController",
             ["$scope", "surveyCache", "$routeParams", "$location",
      function($scope,   surveyCache,   $routeParams,   $location) {

    var surveyData = $routeParams.id ? surveyCache.get($routeParams.id) : {};
    if (!surveyData) {
      $location.path('/');
      return;
    }

    $scope.data = {};
    this.survey = surveyData;

    this.submit = function(valid, data) {
      if (valid) {
        console.log('submitted', data);
      }
    }
  }])

  .controller("InputComponentController", ['$scope', '$attrs', function($scope, $attrs) {
    var directiveScope = $scope.$parent;
    this.options = directiveScope.$eval($attrs.field);
  }]);

angular.forEach([
 'appInputTextComponent',
 'appInputUrlComponent',
 'appInputEmailComponent',
 'appSelectComponent',
 'appTextareaComponent',
 'appInputDateComponent'],

 function(directiveSelector) {
  studyPreviewModule
    .directive(directiveSelector, [function() {
      return {
        controller: 'InputComponentController',
        controllerAs: 'componentCtrl',
        templateUrl : './field-templates/input-text.html',
        scope: {
          model: '='
        }
      }
    }])
 });
