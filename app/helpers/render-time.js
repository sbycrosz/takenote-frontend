var PRINT_RELATIVE_LIMIT = 42200;
export default Ember.Handlebars.makeBoundHelper(function(timestamp) {
  var moment = window.moment;
  var currentTime = moment().unix();
  if  (currentTime - timestamp > PRINT_RELATIVE_LIMIT){
    return "on " + moment.unix(timestamp).format('LL');
  } else {
    return moment.unix(timestamp).fromNow();
  }
});
