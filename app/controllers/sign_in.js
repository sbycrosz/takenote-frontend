export default Ember.Controller.extend(
{
  actions:{
    signIn: function(){
      var params = this.getProperties('username', 'password');
      console.log(params);
    }
  }
});

