import Note from "appkit/models/note";
import AuthenticatedRoute from "appkit/routes/authenticated_route";

export default AuthenticatedRoute.extend({
  model: function(){
    return Note.all();
  }
});
