import mongoose, { Schema } from "mongoose";

// const subjectSchema = new mongoose.Schema({
//     "_id": {
//         "$oid": {
//           "type": "ObjectId"
//         }
//     },
//     "name": {
//       "type": "String"
//     },
//     "classroom": {
//       "type": "Number"
//     },
//     "schedule": {
//       "type": "String"
//     },
//     "students": {
//       "type": [
//         "Mixed"
//       ]
//     }
//   }
// )

const SubjectSchema = new Schema({
    classroom: Number,
    name: String,
    professor: { type: Schema.Types.ObjectId, ref: 'User' },
    schedule: String,
    students: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  });

export const Subject = mongoose.model('Subject',SubjectSchema)