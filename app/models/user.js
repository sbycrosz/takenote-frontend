import ajax from "appkit/utils/ajax";
import storage from "appkit/utils/storage";
import session from "appkit/models/session";

var User = Ember.Object.extend({
  name: null,
  email: null,
  guest: false,

  signUp: function(){
    var params = this.serialize();
    return ajax.post('/sign_up', params)
      .then(function(result){
        session.setToken(result.access_token.token);
        User.setCurrent(result.user);
      });
  },

  serialize: function(){
    return this.getProperties('name', 'email', 'password', 'password_confirmation');
  }
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
  },

  guestSignIn: function(){
    return ajax.post('/guest_sign_in')
      .then(function(result){
        session.setToken(result.access_token.token);
        User.setCurrent(result.user);
      });
  }
});

export default User;
