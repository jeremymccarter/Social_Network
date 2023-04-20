const {Thought, User} = require('../models')

module.exports = {

    getThought(req, res) {
        Thought.find()
        .then((thought) => (res.json))
        .catch((err) => res.status(500).json(err))
    },

    getSingleThought(req,res){
        Thought.findOne({ _id: req.params.courseId})
        .select('-__v')
        .then((thought) =>
            !thought
                ? res.status(404).json({message: 'No thought with that ID =('})
                : res.json(thought)
                )
                .catch((err) => res.status(500).json(err))
    },

    createThought(req,res) {
        Thought.create(req.body)
        .then((thought) => res.json(though))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });

    },

    deleteThought(req,res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId})
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No thought with that ID =('})
            : User.deleteMany({ _id: { $in: thought.user } })
        )
        .then(() => res.json({ message: 'Thought and users deleted!' }))
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
};