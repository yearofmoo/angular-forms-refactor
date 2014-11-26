angular.module('SurveyEditor', ['ngMessages', 'SurveyCommon'])

  .controller("SurveyEditorPageController",
           ["surveyCache", "$routeParams", "$location",
    function(surveyCache,   $routeParams,   $location) {

    var surveyData = $routeParams.id ? surveyCache.get($routeParams.id) : {};
    if (!surveyData) {
      $location.path('/');
      return;
    }
    
    var isNew = surveyData.id >= 0;

    //initialize the data
    this.data = surveyData;
    this.data.fields = this.data.fields || [];

    this.onSave = function(data) {
      if (isNew) {
        surveyCache.set(data.id, data);
      } else {
        surveyCache.add(data);
      }
      $location.path('/preview/' + data.id);
    };
  }])

  .directive("surveyEditorForm", [function() {
    return {
      transclude: true,
      controller : ['$scope', '$attrs', function($scope, $attrs) {
        this.handleSubmit = function(valid) {
          if (valid) {
            $scope.$eval($attrs.onValidSubmit);
          }
        };
      }],
      controllerAs: 'ctrl',
      template: '<form name="surveyForm" ' +
                      'ng-submit="ctrl.handleSubmit(surveyForm.$valid)" ' +
                      'novalidate>' +
                '  <div ng-transclude></div>' +
                '</form>'
    };
  }])

  .directive('surveyEditorFields', [function() {
    return {
      transclude: true,
      controller: 'SurveyFieldsFormController',
      controllerAs: 'fieldsCtrl',
      template: '<div class="repeated-form-fields"' +
                '  ng-form="surveyFieldsForm">' +
                '  <div ng-transclude></div>' +
                '</div>'
    }
  }])

  .directive('surveyEditorField', [function() {
    return {
      transclude: true,
      template: '<div class="repeated-form-row"' +
                '  ng-form="surveyFieldForm">' +
                '  <div ng-transclude></div>' +
                '</div>'
    }
  }])

  .controller("SurveyFieldsFormController", ['$attrs', '$scope', function($attrs, $scope) {
    var self = this;

    this.fields = $scope.$eval($attrs.fields) || [];
    
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
      self.fields.push({});
    };

    this.allowSwap = function(index) {
      return index >= 0 && index < self.fields.length;
    };

    this.swapFields = function(indexA, indexB) {
      if (self.allowSwap(indexB)) {
        var tmp = self.fields[indexA];
        self.fields[indexA] = self.fields[indexB];
        self.fields[indexB] = tmp;
      }
    }

    this.removeField = function(field) {
      var index = self.fields.indexOf(field);
      if (index >= 0) {
        self.fields.splice(index, 1);
      }
    };
  }])
