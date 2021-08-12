const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Username is required',
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: 'Email is required',
           match: [/.+@.+\..+/]
        },
        thoughts: {
            user_id: {
                references: {
                    model: 'thought',
                    key: 'id'
                }
            }
        },
        friends: {
            user_id: {
                references: {
                    model: 'user',
                    key: 'id'
                }
            }
        }
    }
)

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

module.exports = User;