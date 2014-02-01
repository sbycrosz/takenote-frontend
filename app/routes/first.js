import AuthenticatedRoute from "appkit/routes/authenticated_route";
import notif from "appkit/utils/notification";

export default AuthenticatedRoute.extend({
  model: function(params){
    return this.modelFor('notes').get('lastObject');
  },
  afterModel: function(model, transition) {
    if (model){
      this.transitionTo('note', model);
    } else {
      this.transitionTo('index');
    }
  }
});
