const { Thought, User } = require("../models")

const thoughtController = {
    //GET all thoughts
    // `/api/thoughts`
    getAllThoughts(req, res) {
        Thought.find({})
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
    // `/api/thoguhts`
    createThought({ body }, res) {
        Thought.create(body)
            .then(dbThought => res.json(dbThought))
            .catch(err => {
                res.json(err);
            });

    },

    //PUT update thought by _id
    // `/api/thoguhts`
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $push: { thoughts: _id } },
            { new: true })
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
    // `/api/thoguhts`
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
    }
};

// /api/thoughts/:thoughtId/reactions

// POST to create a reaction stored in a single thought's reactions array field

// DELETE to pull and remove a reaction by the reaction's reactionId value



module.exports = thoughtController;

