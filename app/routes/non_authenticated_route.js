import session from "appkit/utils/session_manager";

export default Ember.Route.extend({
  beforeModel: function(){
    if (session.isAuthenticated()){
      this.transitionTo('index');
    }
  }
});
