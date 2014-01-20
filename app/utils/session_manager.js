import ajax from "appkit/utils/ajax";

var SessionManager = Ember.Object.extend({
  init: function() {
    this._super();
    var accessToken = $.cookie('accessToken');
    if (!Ember.isEmpty(accessToken)) {
      this.authenticate(accessToken);
    }
  },
 
  isAuthenticated: function() {
    return !Ember.isEmpty(this.get('accessToken'));
  },
 
  authenticate: function(accessToken) {
    this.set('accessToken', accessToken);
  },
 
  deauthenticate: function() {
    this.set('accessToken', null);
  },
 
  accessTokenObserver: function() {
    if (Ember.isEmpty(this.get('accessToken'))) {
      $.removeCookie('accessToken');
    } else {
      $.cookie('accessToken', this.get('accessToken'));
    }
  }.observes('accessToken')
});

if (Ember.isEmpty(window.sessionManager)){
  window.sessionManager = SessionManager.create();
}
var sessionManager = window.sessionManager;

export default sessionManager;
