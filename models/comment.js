import mongoose, { Schema } from "mongoose";

const commentSchema = mongoose.Schema({
    content : {
        type: String
    },
    author: {
        type : Schema.Types.ObjectId, 
        ref : 'User'
    },
    createdAt: {
        type : Date,
        default : Date.now()
    }
},{Timestamp: true})

export const Comment = mongoose.model('Comment',commentSchema)