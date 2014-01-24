if (!window.storage) {
  var Storage = Ember.Object.extend({
    pushObject: function(property, obj){
      var collections = this.get(property);
      collections.pushObject(obj);
    },
    removeObject: function(property, obj){
      var collections = this.get(property);
      collections.removeObject(obj);
    }
  });
  window.storage = Storage.create();
}
export default window.storage;
