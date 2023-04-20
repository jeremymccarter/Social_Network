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
},

 toJSON: {
        getters: true,
    },

id: false,


})

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            require: true,
            max_length: 280
        },
        createdAt: {
            type: Date,
            get: function(createdAt){
                return createdAt.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
            }
        },
        username: {
            type: String,
            require: true
        },
        reactions: [
            reactionSchema
        ]
    },
    {
        toJson: {
            virtuals: true,
        },
        id: false
    }
);