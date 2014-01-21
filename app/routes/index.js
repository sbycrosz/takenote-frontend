import session from "appkit/utils/session_manager";

export default Ember.Route.extend({
  model: function(){
    if (!session.isAuthenticated()){
      this.transitionTo('sign_in');
    }
  }
});
