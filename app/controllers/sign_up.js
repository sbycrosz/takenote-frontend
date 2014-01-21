import ajax from "appkit/utils/ajax";
import notif from "appkit/utils/notification";

export default Ember.Controller.extend({
  needs: "application",

  init: function() {
    this._super();
    if (window.ENV.debug){
      this.set('name', 'Sambya');
      this.set('email', 'sambya@aryasa.net');
      this.set('password', 'Password01');
      this.set('password_confirmation', 'Password01');
    }
  },
  
  errors: null,

  clearForm: function(){
    this.set('name', null);
    this.set('email', null);
    this.set('password', null);
    this.set('password_confirmation', null);
    this.clearErrors();
  },

  clearErrors: function(){
    this.set('errors', null);  
  },

  actions:{
    signUp: function(){
      var _this = this;
      var params = this.getProperties('name', 'email', 'password', 'password_confirmation');
      this.clearErrors();
      
      var promise = ajax.post('/sign_up', params);
      promise.done(function(result){
        notif.success('Signed up succesfully');
        var appController = _this.get('controllers.application');
        appController.setSession(result);

        _this.clearForm();
        _this.transitionToRoute('index');
      });
      promise.fail(function(reason){
        _this.set('errors', reason.responseJSON.error);
      });
    }
  }
});

