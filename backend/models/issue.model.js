import { mongoose } from "mongoose";



// Legal issue schema
const issueSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,  
  },
  summary: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  history: {
    type: String,
    enum: ['contract', 'employment', 'property', 'criminal', 'family', 'other'],
    required: true,
  },
});

const issue = mongoose.model('issue', issueSchema);

export default issue;

