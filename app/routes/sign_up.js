import User from "appkit/models/user";
import NonAuthenticatedRoute from "appkit/routes/non_authenticated_route";

export default NonAuthenticatedRoute.extend({
  model: function(){
    return User.create();
  },
  setupController: function(controller){
    if (!window.ENV.debug){
      controller.clearForm();
    }
  }
});
