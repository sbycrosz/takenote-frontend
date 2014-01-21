import ajax from "appkit/utils/ajax";

var User = Ember.Object.extend({
  name: null,
  email: null
});

User.reopenClass({
  current: function() {
    if(this._current){return this._current;}
    return ajax.get('/me').then(function(result){
      this._current = User.create(result);
      return this._current;
    });
  },
  setCurrent: function(data) {
    this._current = User.create(data);
  }
});

export default User;
