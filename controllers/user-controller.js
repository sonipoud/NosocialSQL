const { User } = require('../models')

const userController = {
    //GET all users
    // `/api/users`
    getAllUser(req, res) {
        User.find({})
            .populate({
                path: 'thought',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUser => res.json(dbUser))
            .catch(err => {
                res.json(err);
            });
    },

    //GET a single user by _id
    // `/api/users`
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thought',
                path: 'friend',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({ message: 'No USER found with this id' });
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => {
                res.json(err);
            });
    },

    //POST new user
    // `/api/users`
    createUser({ body }, res) {
        User.create(body)
            .then(dbUser => res.json(dbUser))
            .catch(err => {
                res.json(err);
            });

    },

    //PUT update user by _id
    // `/api/users`
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({ message: 'No USER found with this id' });
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => {
                res.json(err);
            });
    },

    //DELETE remove user by _id
    //`/api/users`
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({ message: 'No USER found with this id' });
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => {
                res.json(err);
            });
    },

    // POST to add a new friend to a user's friend list
    // /api/users/:userId/friends/:friendId
    addFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUser => res.json(dbUser))
            .catch(err => {
                res.json(err);
            });
    },

    // DELETE to remove a friend from a user's friend list
    // /api/users/:userId/friends/:friendId
    removeFriend({ params }, res) {
        User.findByIdAndDelete(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUser => res.json(dbUser))
            .catch(err => {
                res.json(err);
            });
    }
};

module.exports = userController;
