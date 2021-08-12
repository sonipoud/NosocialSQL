const { User } = require("../models")

const userController = {
    //GET all users
    // `/api/users`
    getAllUser(req, res) {
        User.find({})
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
                path: 'thoughts',
                path: 'friends',
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
    }
};

// /api/users/:userId/friends/:friendId

// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list

module.exports = userController;
