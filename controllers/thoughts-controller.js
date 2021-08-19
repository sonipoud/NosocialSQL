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
            .sort({_id:-1})
            .then(dbThought => res.json(dbThought))
            .catch(err => {
                res.json(err);
            });
    },

    //GET a single thought by _id
    // `/api/thoughts`
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'user',
                select: '-__v'
            })
            .select('-__v')
            .sort({_id:-1})
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
    // `/api/thoughts`
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: {thoughts: _id } },
                    {new: true}
                )
            })
            .then(dbThought => res.json(dbThought))
            .catch(err => {
                res.json(err);
            });

    },

    //PUT update thought by _id
    // `/api/thoughts`
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
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
        Thought.findOneAndDelete({ _id: params.id })
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

    // POST to create a reaction stored in a single thought's reactions array field
    // /api/thoughts/:thoughtId/reactions
    addReaction({ params, body }, res) {
        Thought.findByIdAndUpdate(
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
        Thought.findByIdAndDelete(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThought => res.json(dbThought))
            .catch(err => {
                res.json(err);
            });
    }
};

module.exports = thoughtController;

