import Note from 'appkit/models/note';
import storage from "appkit/utils/storage";

export default Ember.ArrayController.extend({
  storage: storage,
  sortProperties: ['updated_at', 'title'],
  sortAscending: false,

  modelBinding: Ember.Binding.oneWay("storage.notes"),
  notesCount: Ember.computed.alias('length'),

  actions: {
    createNote: function(){
      var dummyData = {id: 42, title: "Added Note", updated_at: "1390148800", body: "this is a body"};
      var note = Note.createRecord(dummyData);
      this.transitionTo('note', note);
    }
  }
});
