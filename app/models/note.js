import ajax from "appkit/utils/ajax";

var Note = Ember.Object.extend({
  title: null,
  body: null
});

Note.reopenClass({
  all: function() {
    return ajax.get('/notes').then(function(response){
      return response.data.map(function(noteParams){
        return Note.create(noteParams);
      });
    });
  }
});

export default Note;
