angular.module('SurveyEditor', ['ngMessages', 'SurveyCommon'])

  .controller("SurveyFormController", ["$scope", "surveyCache", "$routeParams", "$location",
                               function($scope,   surveyCache,   $routeParams,   $location) {

    var surveyData = $routeParams.id ? surveyCache.get($routeParams.id) : {};
    if (!surveyData) {
      $location.path('/');
      return;
    }
    
    $scope.data = surveyData;
    $scope.data.fields = $scope.data.fields || [];

    var entryExists = surveyData.id >= 0;

    var ctrl = this;
    this.submit = function(isValid, data) {
      if (isValid) {
        if (entryExists) {
          surveyCache.set(data.id, data);
        } else {
          surveyCache.add(data);
        }
        $location.path('/preview/' + data.id);
      }
    };
  }])

  .controller("SurveyFieldsFormController", ['$attrs', '$scope', function($attrs, $scope) {
    var fields = $scope.$eval($attrs.fields);

    this.inputTypes = [
      { value: "input", title: "input" },
      { value: "input:email", title: "input[email]" },
      { value: "input:url", title: "input[url]" },
      { value: "input:date", title: "input[date]" },
      { value: "textarea", title: "textarea" },
      { value: "select", title: "select" }
    ];

    this.isMultipleField = function(type) {
      return type == 'select';
    };

    this.newField = function() {
      fields.push({});
    };

    this.allowSwap = function(index) {
      return index >= 0 && index < fields.length;
    };

    this.swapFields = function(indexA, indexB) {
      if (this.allowSwap(indexB)) {
        var tmp = fields[indexA];
        fields[indexA] = fields[indexB];
        fields[indexB] = tmp;
      }
    }

    this.removeField = function(field) {
      var index = fields.indexOf(field);
      if (index >= 0) {
        fields.splice(index, 1);
      }
    };
  }])
