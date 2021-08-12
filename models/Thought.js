const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
    {
       thoughtText: {
           type: String,
           required: true,
        //    validate: length [1-280]
       },
       createdAt: {
           type: Date,
           default: Date.now,
           get: createdAtVal => dateFormat(createdAtVal)
       },
       username: {
           type: String,
           required: 'Username is required'
       },
       reactions: [reactionSchema]
    }
)

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reaction.length;
});

module.exports = Thought;