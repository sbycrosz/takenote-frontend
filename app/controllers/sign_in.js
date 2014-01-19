import ajax from "appkit/utils/ajax";

export default Ember.Controller.extend(
{
  actions:{
    signIn: function(){
      var params = this.getProperties('username', 'password');
      var promise = ajax.post('/sign_in', params);
      promise.done(function(result){
      });
      promise.fail(function(reason){
      });
    }
  }
});

