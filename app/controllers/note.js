export default Ember.ObjectController.extend({
  isEditting: false,
  actions: {
    startEditting: function(){
      this.set('isEditting', true);
      this.set('editedBody', this.get('body'));
      this.set('editedTitle', this.get('title'));
    },
    doneEditting: function(){
      this.set('isEditting', false);
      this.set('body', this.get('editedBody'));
      this.set('title', this.get('editedTitle'));
    }
  }
});
