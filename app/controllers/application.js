import session from "appkit/utils/session_manager";
import notif from "appkit/utils/notification";

export default Ember.Controller.extend({
  session: session,
  isAuthenticated: function(){
    return session.isAuthenticated();
  }.property('session.accessToken'),

  actions: {    
    signOut: function() {
      session.deauthenticate();
      this.transitionToRoute('index');
      notif.success('Logged Out Successfully');
    }
  }
});

