import ajax from "appkit/utils/ajax";

var Note = Ember.Object.extend({
  title: null,
  body: null,
  updated_at: null,
  
  excerpt: function(){
    var body = this.get('body');
    return body.substr( 0, body.lastIndexOf( ' ', 50 ) ) + '...';
  }.property('body'),

  updatedAtRelativeTime: function(){
    var updatedAt = this.get('updated_at');
    return moment.unix(updatedAt).fromNow();
  }.property('updated_at')
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
