import storage from "appkit/utils/storage";

var Session = Ember.Object.extend({
  init: function() {
    this._super();
    var token = $.cookie('token');
    if (!Ember.isEmpty(token)) {
      this.setToken(token);
    }
  },
 
  isAuthenticated: function() {
    return !Em.isEmpty(this.get('token'));
  }.property('token'),

  setToken: function(token){
    this.set('token', token);
  },

  clearToken: function() {
    this.set('token', null);
  },

  getToken: function(){
    return this.get('token') || window.ENV.client_token;
  },

  cookieMaker: function() {
    var token = this.get('token');
    if (Ember.isEmpty(token)) {
      $.removeCookie('token');
    } else {
      $.cookie('token', token);
    }
  }.observes('token')
});

var session = storage.get('currentSession');
if(!session) {
  session = Session.create();
  storage.set('currentSession', session);
}

export default session;
