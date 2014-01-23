import AuthenticatedRoute from "appkit/routes/authenticated_route";
import notif from "appkit/utils/notification";

export default AuthenticatedRoute.extend({
  model: function(params){
    return this.modelFor('notes').findBy('id', +params.id);
  },
  afterModel: function(model, transition) {
    if (!model) {
      notif.error('Not found :(');
      this.transitionTo('index');
    }
  }
});
