import mongoose, { Schema } from "mongoose";

const ReportSchema = new Schema({
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      description: "must be an objectId that references the subject collection and is required"
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      description: "must be an objectId that references the user collection and is required"
    },
    calification: {
      type: Schema.Types.Decimal128,
      description: "must be a number and is required"
    }
  });

  export const Report = mongoose.model('Report',ReportSchema)