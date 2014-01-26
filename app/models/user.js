import ajax from "appkit/utils/ajax";
import storage from "appkit/utils/storage";

var User = Ember.Object.extend({
  name: null,
  email: null
});

User.reopenClass({
  current: function() {
    var stored = storage.get('currentUser');
    if(stored) {return stored;}
    return ajax.get('/me').then(function(result){
      var currentUser = User.create(result);
      storage.set('currentUser', currentUser);
      return currentUser;
    });
  },
  setCurrent: function(data) {
    var currentUser = User.create(data);
    storage.set('currentUser', data);
  },
  clearCurrent: function(){
    this.setCurrent(null);
  }
});

export default User;
