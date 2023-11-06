import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:false
    },
    authorName : {
        type : String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export const Comment = mongoose.model('Comment',commentSchema)