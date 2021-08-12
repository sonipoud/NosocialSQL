const router = require('express').Router();
const{
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughts-controller');

// `/api/thoughts`
router 
.route('/')

// /api/thoughts/:thoughtId/reactions


module.exports = router;