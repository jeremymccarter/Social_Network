const {Thought, User} = require('../models')

module.exports = {

    getThought(req, res) {
        Thought.find({})
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err))
    },

    getSingleThought(req,res){
        Thought.findOne({ _id: req.params.thoughtId})
        .select('-__v')
        .then((thought) =>
            !thought
                ? res.status(404).json({message: 'No thought with that ID =('})
                : res.json(thought)
                )
                .catch((err) => res.status(500).json(err))
    },

    createThought({params, body}, res) {
        Thought.create(body)
          .then(({_id}) => {
            return User.findOneAndUpdate(
              {_id: body.userId},
              {$push: {thoughts:_id}},
              { new: true}
            )
            })
          .then(thought => {
            if(!thought) {

             return res.status(404).json({ message: 'No thought with that ID' });
             
            }
            res.json( {message: 'Thought successfully posted!'});
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          })
        
    
      },

    deleteThought(req,res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId})
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No thought with that ID =('})
            : User.deleteMany({ _id: { $in: thought.user } })
        )
        .then(() => res.json({ message: 'This thought has been unthunk!' }))
        .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true}
        )

        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought with this Id =('})
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: body } },
          { runValidators: true, new: true })
          .then((thought) =>
            !thought
              ? res
                  .status(404)
                  .json({ message: 'No thought found with that ID =(' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      // Remove reaction from a thought
      removeReaction({params, body}, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reaction: { reactionId: params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res
                  .status(404)
                  .json({ message: 'No thought found with that ID =(' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      }, 
    };

//  module.exports = router;