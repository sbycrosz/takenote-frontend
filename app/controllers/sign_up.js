import User from "appkit/models/user";
import ajax from "appkit/utils/ajax";
import notif from "appkit/utils/notification";

export default Ember.Controller.extend({

  init: function() {
    this._super();
    if (window.ENV.debug){
      var dummyUser = User.create({name: 'name', email: 'email@mail.com', password: 'Password01', password_confirmation: 'Password01'});
      this.set('model', dummyUser);
    }
  },
  
  errors: null,

  clearForm: function(){
    var emptyUser = User.create({});
    this.set('model', emptyUser);
    this.clearErrors();
  },

  clearErrors: function(){
    this.set('errors', null);  
  },

  actions:{
    signUp: function(){
      var _this = this;
      var user = this.get('model');
      
      this.clearErrors();
      notif.showLoading();
      
      user.signUp().then(function(result){
        notif.hideLoading();
        _this.clearForm();
        _this.transitionToRoute('index');
        notif.success('Signed up succesfully');

      },function(reason){
        notif.hideLoading();
        _this.set('errors', reason.responseJSON.error);
      });
    }
  }
});

