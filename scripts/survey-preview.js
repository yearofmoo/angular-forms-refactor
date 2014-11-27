class SurveyResult {
  constructor(data) {
    this._data = data || {};
    this._answers = this._data.answers;
  }

  answers() {
    var index = 0;
    var self = this;
    return {
      [Symbol.iterator]: function() {
        return {
          next : function() {
            var value = index >= self._answers.length ? null : self._answers[index++];
            return { value : value, done : !value };
          } 
        }
      }
    };
  }
}


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
        var result = new SurveyResult(data);
        for (var number of result.answers()) {
          console.log(number);
        }
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
