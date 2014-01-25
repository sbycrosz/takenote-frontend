export default Ember.Handlebars.makeBoundHelper(function(timestamp) {
  var moment = window.moment;
  return moment.unix(timestamp).format('L');
});
