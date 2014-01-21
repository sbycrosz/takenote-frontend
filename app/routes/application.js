import session from "appkit/utils/session_manager";
import User from "appkit/models/user";

export default Ember.Route.extend({
  model: function(){
    if (session.isAuthenticated()){
      return User.current();
    }
  },

  setupController: function(controller, user){
    controller.set('currentUser', user);
  }
});
