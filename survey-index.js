angular.module("SurveyIndex", ['SurveyCommon'])

  .controller('SurveyListController', ['surveyCache', function(surveyCache) {
    var self = this;
    this.entries = surveyCache.list();
    this.count = count(this.entries);
    this.removeSurvey = function(entry) {
      surveyCache.remove(entry.id);
      delete self.entries[entry.id];
    }

    function count(col) {
      var count = 0;
      for(var i in col) {
        count++;
      }
      return count;
    }
  }])
