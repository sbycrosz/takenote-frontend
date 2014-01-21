import User from "appkit/models/user";
import session from "appkit/utils/session_manager";
import notif from "appkit/utils/notification";
import ajax from "appkit/utils/ajax";

export default Ember.Controller.extend({
  session: session,

  currentUser: null,

  isAuthenticated: function(){
    return session.isAuthenticated();
  }.property('session.accessToken'),

  setSession: function(signInResponse){
    User.setCurrent(signInResponse.user);
    this.set('currentUser', User.current());
    session.authenticate(signInResponse.access_token.token);
  },

  actions: {    
    signOut: function() {
      var _this = this;
      ajax.delete('/sign_out').then(function(result){
        session.deauthenticate();
        _this.transitionToRoute('sign_in');
        notif.success('Logged Out Successfully');
      });
    }
  }
});

