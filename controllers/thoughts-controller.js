const { Thought, User } = require('../models')

const thoughtController = {
    //GET all thoughts
    // `/api/thoughts`
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'user',
                select: '-__v'
            })
            .select('-__v')
            .sort({_id: -1})
            .then(dbThought => res.json(dbThought))
            .catch(err => {
                res.json(err);
            });
    },

    //GET a single thought by _id
    // `/api/thoughts`
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .populate({
                path: 'user',
                select: '-__v'
            })
            .select('-__v')
            .sort({_id: -1})
            .then(dbThought => {
                if (!dbThought) {
                    res.status(404).json({ message: 'No THOUGHT found with this id' });
                    return;
                }
                res.json(dbThought);
            })
            .catch(err => {
                res.json(err);
            });
    },

    //POST new thought
    // `/api/thoughts/userId`
    createThought({ body }, res) {
        console.log(body)
        Thought.create(body)
            .then((dbThoughtData) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                )
            })
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({ message: 'Thought created but no USER found with this id' });
                    return;
                }
                res.json({message: 'thoughts successfully created'})
            })
            .catch(err => {
                res.json(err);
            });

    },

    //PUT update thought by _id
    // `/api/thoughts`
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
            .then(dbThought => {
                if (!dbThought) {
                    res.status(404).json({ message: 'No THOUGHT found with this id' });
                    return;
                }
                res.json(dbThought);
            })
            .catch(err => {
                res.json(err);
            });
    },

    //DELETE remove thought by _id
    // `/api/thoughts`
    deleteThought({ params }, res) {
        Thought.findOneAndRemove({ _id: params.thoughtId })
            .then(dbThought => {
                if (!dbThought) {
                    res.status(404).json({ message: 'No THOUGHT found with this id' });
                    return;
                }
                res.json(dbThought);
                return User.findOneAndUpdate(
                    { thoughts: params.thoughtId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                )
            })
            .catch(err => {
                res.json(err);
            });
    },

    // POST to create a reaction stored in a single thought's reactions array field
    // /api/thoughts/:thoughtId/reactions
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
            .then(dbThought => res.json(dbThought))
            .catch(err => {
                res.json(err);
            });
    },

    // DELETE to pull and remove a reaction by the reaction's reactionId value
    // /api/thoughts/:thoughtId/reactions
    removeReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: body } },
            { new: true }
        )
            .then(dbThought => res.json(dbThought))
            .catch(err => {
                res.json(err);
            });
    }
};

module.exports = thoughtController;

