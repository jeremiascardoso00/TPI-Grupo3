import mongoose, { Schema } from "mongoose";

const ReportSchema = new Schema({
    _id: {
      bsonType: "objectId",
      description: "must be an objectId and is required"
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "subject",
      description: "must be an objectId that references the subject collection and is required"
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "user",
      description: "must be an objectId that references the user collection and is required"
    },
    calification: {
      bsonType: "number",
      description: "must be a number and is required"
    }
  });

  export const Report = mongoose.model('reports',ReportSchema)