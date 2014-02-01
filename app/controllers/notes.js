import Note from 'appkit/models/note';
import storage from "appkit/utils/storage";
import notif from "appkit/utils/notification";

export default Ember.ArrayController.extend({
  storage: storage,
  sortProperties: ['updated_at', 'id', 'title'],
  sortAscending: false,

  modelBinding: Ember.Binding.oneWay("storage.notes"),
  notesCount: Ember.computed.alias('length'),

  actions: {
    createNote: function(){
      var _this = this;
      notif.showLoading();
      Note.createRecord().then(function(createdNote){
        notif.hideLoading();
        _this.transitionToRoute('note', createdNote);
      });
    }
  }
});
