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

angular.forEach({
 'input-text': 'appInputTextComponent',
 'input-url': 'appInputUrlComponent',
 'input-email': 'appInputEmailComponent',
 'input-date': 'appInputDateComponent',
 'select': 'appSelectComponent',
 'textarea': 'appTextareaComponent'
 }, function(directiveSelector, tpl) {
  studyPreviewModule
    .directive(directiveSelector, [function() {
      return {
        controller: 'InputComponentController',
        controllerAs: 'componentCtrl',
        templateUrl : './field-templates/' + tpl + '.html',
        scope: {
          model: '='
        }
      }
    }])
 });
