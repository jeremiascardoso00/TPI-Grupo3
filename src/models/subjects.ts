import mongoose, { Schema } from "mongoose";

const subjectSchema = new mongoose.Schema({
    "_id": {
        "$oid": {
          "type": "ObjectId"
        }
    },
    "name": {
      "type": "String"
    },
    "classroom": {
      "type": "Number"
    },
    "schedule": {
      "type": "String"
    },
    "students": {
      "type": [
        "Mixed"
      ]
    }
  }
)

export const Subject = mongoose.model('subject',subjectSchema)