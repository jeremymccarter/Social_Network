const { Schema, model } = require('mongoose');



const reactionSchema= new Schema(
{
reactionID: {
    type: Schema.Types.ObjectId,
    default: function() {
        return new Schema.Types.ObjectId()
    }

},
reactionBody: {
    type: String,
    required: true,
    max_length: 280,
},
username: {
    type: String,
    required: true,
},
createdAt: {
    type: Date,
    get: function(createdAt){
        return createdAt.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
    }
}
})