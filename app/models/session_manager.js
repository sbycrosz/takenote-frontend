import ajax from "appkit/utils/ajax";
import session from "appkit/models/session";
import User from "appkit/models/user";

var SessionManager = Ember.Object.extend({});

SessionManager.reopenClass({
  authenticate: function(params) {
    return ajax.post('/sign_in', params).then(function(result){
      session.setToken(result.access_token.token);
      User.setCurrent(result.user);
      return result;
    });
  }, 
  deauthenticate: function(){
    return ajax.delete('/sign_out').then(function(result){
      session.clearToken();
      User.clearCurrent();
    });
  }
});

export default SessionManager;