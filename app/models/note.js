import ajax from "appkit/utils/ajax";
import storage from "appkit/utils/storage";

var Note = Ember.Object.extend({
  title: null,
  body: null,
  updated_at: null,

  commit: function(){
    var id = this.get('id');
    var params = this.getProperties('body', 'title');
    var _this = this;

    return ajax.put('/notes/' + id , params).then(function(response){
      _this.setProperties(response);
      return _this;
    });
  },

  destroyRecord: function(){
    var id = this.get('id');
    var _this = this;
    return ajax.delete('/notes/' + id).then(function(response){
      storage.removeObject('notes', _this);
    });
  }
});

Note.reopenClass({
  all: function() {
    return ajax.get('/notes').then(function(response){
      var notes = response.data.map(function(noteParams){
        return Note.create(noteParams);
      });

      storage.set('notes', notes);
      return notes;
    });
  },
  
  createRecord: function(){
    var params = ({title: "New note", body:""});
    return ajax.post('/notes', params).then(function(response){
      var createdNote = Note.create(response);
      storage.pushObject('notes', createdNote);    
      return createdNote;
    });
  }
});

export default Note;
