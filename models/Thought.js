const { Schema, model } = require('mongoose');
const reactionSchema = require ('./Reaction');




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

thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return `reactions: ${this.reactions.length}`;
  });

const Thought = model('thought', thoughtSchema)
module.exports = Thought
// module.exports = router;