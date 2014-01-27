var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.route('sign_in');
  this.route('sign_up');

  this.resource('notes', function(){
    this.resource('note', {path: '/:id'});
  });
});

export default Router;
