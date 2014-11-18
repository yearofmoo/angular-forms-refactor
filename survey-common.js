angular.module("SurveyCommon", [])

  .factory('surveyCache', [function() {
    var self, PREFIX = 'surveyCache';
    var data = localStorage[PREFIX];
    var collection = data && data.length ? loadEntryFromJSON(data) : {};
    return self = {
      list : function() {
        return collection;
      },
      get : function(id) {
        return collection[id + ""];
      },
      exists : function(id) {
        return !!collection[id + ""];
      },
      set : function(id, data) {
        if (self.exists(id)) {
          data.id = id;
          collection[id] = data;
          self.save();
        }
      },
      add : function(data) {
        var id = getMaxID(collection) + 1;
        data.id = id;
        collection[id + ""] = data;
        self.save();
      },
      remove : function(id) {
        if (self.exists(id)) {
          delete collection[id];
          self.save();
        }
      },
      save : function() {
        localStorage[PREFIX] = JSON.stringify(collection);
      }
    };

    function loadEntryFromJSON(data) {
      var contents = JSON.parse(data);
      angular.forEach(contents, function(entry) {
        entry.date = new Date(entry.date);
      });
      return contents;
    }

    function getMaxID(data) {
      var max = 0;
      for (var i in data) {
        max = Math.max(i, max);
      }
      return max;
    }
  }])

