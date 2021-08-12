const router = require('express').Router();
const{
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend
} = require('../../controllers/user-controller');

// `/api/users`
router
.route('/')
.get(getAllUser)
.post(createUser);

// /api/users/:userId/friends/:friendId
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

router
.route('/:userId/friends/:friendId')
.post(addFriend);


module.exports = router;