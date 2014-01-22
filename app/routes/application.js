import session from "appkit/utils/session_manager";
import User from "appkit/models/user";
import notif from "appkit/utils/notification";

export default Ember.Route.extend({
  model: function(){
    if (session.isAuthenticated()){
      return User.current();
    }
  },

  setupController: function(controller, user){
    controller.set('currentUser', user);
  },
  actions: {
    error: function(reason, transition) {
      if (reason.status === 401){
        notif.error('Your token has expired');
        session.deauthenticate();
        this.transitionTo('sign_in');
      } else {
        notif.error('Error#' + reason.status);
      }
    }
  }
});
