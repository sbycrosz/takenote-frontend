import notif from "appkit/utils/notification";

export default Ember.ObjectController.extend({
  isEditting: false,
  actions: {
    startEditting: function(){
      this.set('isEditting', true);
    },
    doneEditting: function(){
      var _this = this;
      var note = this.get('model');
      notif.showLoading("Synching...");
      note.commit().then(function(){
        notif.hideLoading();
        _this.set('isEditting', false);      
      });
    },
    confirmDelete: function(){
      this.set('confirmDeletion', true);
    },
    cancelDelete: function(){
      this.set('confirmDeletion', false);
    },
    deleteNote: function(){
      var _this = this;
      var note = this.get('model');
      note.destroyRecord().then(function(){
        _this.transitionToRoute('index');
        notif.success('Note deleted');
      });
    }
  }
});
