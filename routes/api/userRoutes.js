const router = require('express').Router();

const{
getUser,
getSingleUser,
createUser,
deleteUser,
addFriend,
removeFriend,

} = require('../../controllers/userController')

router.route('/').get(getUser).post(createUser);

router.route('/:userId').get(getSingleUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend);

router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;