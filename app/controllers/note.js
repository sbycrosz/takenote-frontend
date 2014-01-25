import notif from "appkit/utils/notification";

export default Ember.ObjectController.extend({
  actions: {
    saveNote: function(){
      var _this = this;
      var note = this.get('model');
      note.commit();
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
      notif.showLoading();
      note.destroyRecord().then(function(){
        notif.hideLoading();
        _this.transitionToRoute('index');
        notif.success('Note deleted');
      });
    }
  }
});
