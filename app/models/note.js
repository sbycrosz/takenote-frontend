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
  }.property('updated_at')
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
    var defaultParams = ({title: "New note", body: "Click here to start writing.."});
    return ajax.post('/notes', defaultParams).then(function(response){
      var createdNote = Note.create(response);
      storage.pushObject('notes', createdNote);    
      return createdNote;
    });
  }
});

export default Note;
