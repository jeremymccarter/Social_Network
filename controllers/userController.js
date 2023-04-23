const Thought  = require('../models/Thought')
const User = require('../models/User')

const headCount = async () =>
  User.aggregate()
    .count('userCount')
    .then((numberOfUsers) => numberOfUsers);


module.exports = {

    getUser(req, res) {
        User.find()
        .then(async (user) => {
            const userObj = {
                user,
                headCount: await headCount(),
            };
            return res.json(userObj);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });

    },

    // getSingleUser(req, res) {
    //     User.findOne({ _id: req.params.userId})
    //     .select('-__v')
    //     .then(async (user) => 
    //         !user
    //         ? res.status(404).json({ message: 'No user with that ID =('})
    //         : res.json({
    //             user,
    //             thought: await thought(req.params.userId),
    //         })
    //     )
    //     .catch((err) => {
    //         console.log(err);
    //         return res.status(500).json(err);
    //     })
    // },

    getSingleUser({params}, res) {
        User.findOne({ _id: params.userId })

          .then(user => {
            if( !user) {
              res.status(404).json({ message: 'No user with that ID' });
              return;
            }
              res.json(user);
      })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },

    createUser(req,res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err))
    },

    deleteUser(req,res) {
        User.findOneAndDelete({ _id: req.params.userId})
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No such user exists'})
                : Thought.findOneAndUpdate(
                    { user: req.params.userId},
                    { $pull: { user: req.params.userId } },
                    { new: true}
                )
        )
        .then((thought) =>
            !thought
                    ? res.status(404).json({ message: 'User deleted, but no thoughts found'})
                    : res.json({ message: 'User successfully deleted'})
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //path= api/users/userId/friends/friendId
    // addFriend(req, res) {
    //     console.log('You are adding a friend');
    //     console.log(req.body);
    //     User.findOneandUpdate(
    //         { _id: req.params.userId},
    //         { $addToSet: { friends: req.body} },
    //         { runValidators: true, new: true}
    //     )
    //         .then((user) =>
    //         !user
    //         ? res
    //             .status(404)
    //             .json({ message: 'No user found with that ID'})
    //             : res.json(user)
    //         )

    //         .catch((err) => res.status(500).json(err));
    // },
    addFriend({params}, res) {

        User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { friends: params.friendId }},
          { new: true, runValidators: true })
        // .populate({path: 'friends', select: ('-__v')})
        // .select('-__v')
        .then(user => {
          if(!user) {
            res.status(404).json({ message: "No user found with this Id" })
            return;
          }
          res.json(user);
        })
        .catch(err => res.status(500).json(err));
      },

      removeFriend({ params}, res) {
        User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { friends: params.friendId }},
          { new: true, runValidators: true })
          // .populate({path: 'friends', select: '-__v'})
          // .select('-__v')
          .then(user => {
            if(!user) {
              res.status(404).json({ message: "No user found with this Id" });
            return;
          }
          res.json(user);
        })
          .catch(err => res.status(500).json(err))
        },

}






// module.exports = router;