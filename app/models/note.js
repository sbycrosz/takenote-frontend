import ajax from "appkit/utils/ajax";
import storage from "appkit/utils/storage";

var Note = Ember.Object.extend({
  title: null,
  body: null,
  updated_at: null,
  
  excerpt: function(){
    var body = this.get('body');
    if (!body) { return ""; }
    return body.substr( 0, body.lastIndexOf( ' ', 50 ) ) + '...';
  }.property('body'),

  updatedAtRelativeTime: function(){
    var updatedAt = this.get('updated_at');
    /* jshint ignore:start */ // TODO properly import momentjs
    return moment.unix(updatedAt).fromNow();
    /* jshint ignore:end*/
  }.property('updated_at'),

  commit: function(){
    var id = this.get('id');
    var params = this.getProperties('body', 'title');
    var _this = this;

    return ajax.put('/notes/' + id , params).then(function(response){
      _this.setProperties(response);
      return _this;
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
    var params = ({title: "New note"});
    return ajax.post('/notes', params).then(function(response){
      var createdNote = Note.create(response);
      storage.pushObject('notes', createdNote);    
      return createdNote;
    });
  }
});

export default Note;
