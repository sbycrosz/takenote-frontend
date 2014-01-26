import session from "appkit/models/session";

export default Ember.Route.extend({
  beforeModel: function(){
    if (!session.get('isAuthenticated')){
      this.transitionTo('sign_in');
    }
  }
});
