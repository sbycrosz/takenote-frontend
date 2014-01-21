import NonAuthenticatedRoute from "appkit/routes/non_authenticated_route";

export default NonAuthenticatedRoute.extend({
  setupController: function(controller){
    if (!window.ENV.debug){
      controller.clearForm();
    }
  }
});
