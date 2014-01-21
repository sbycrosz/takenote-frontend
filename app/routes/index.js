import AuthenticatedRoute from "appkit/routes/authenticated_route";

export default AuthenticatedRoute.extend({
  beforeModel: function(){
    this._super();
    this.transitionTo('notes');
  }
});
