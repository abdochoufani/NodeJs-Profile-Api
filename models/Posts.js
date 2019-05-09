const mongoose = require('mongoose')
const Schema = mongoose.Schema
//create Scema
const PostsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    text: {
        type: String,
        required: true
    },

    name: {
        type: String
    },

    avatar: {
        type: String
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        text: {
            type: String,
            required: true
        },
        name: {
            type: String
        },

        avatar: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }

    }],
    date: {
        type: Date,
        default: Date.now
    }

})

//create model for schema
const Posts = mongoose.model('posts', PostsSchema)
module.exports = Posts