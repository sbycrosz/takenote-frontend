var MAXIMUM_EXCERPT_LENGTH = 50;
export default Ember.Handlebars.makeBoundHelper(function(text) {
  if (!text) { return ""; }

  var strippedText = text.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>|(&nbsp;|<br>)?/gi, ''); 

  if (strippedText.length < MAXIMUM_EXCERPT_LENGTH){
    return strippedText;
  } else {
    return strippedText.substr( 0, strippedText.lastIndexOf( ' ', 50 ) ) + '...';
  }
});
