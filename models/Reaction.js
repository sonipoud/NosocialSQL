const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            // validate: length [1-280]
        },
        username: {
            type: String,
           required: 'Username is required'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    }
)

// ReactionSchema.virtual('reactionCount').get(function () {
//     return this.reaction.length;
// });

module.exports = Reaction;