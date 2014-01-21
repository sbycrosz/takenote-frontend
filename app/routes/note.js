import AuthenticatedRoute from "appkit/routes/authenticated_route";

export default AuthenticatedRoute.extend({
  model: function(params){
    return this.modelFor('notes').findBy('id', +params.id);
  }
});
