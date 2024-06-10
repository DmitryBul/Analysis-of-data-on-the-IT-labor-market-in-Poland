import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  technology: {
    type: String,
    required: true,
  },
  seniority: {
    type: String,
    required: true,
  },
  avg_Salary: {
    type: Number,
    required: true,
  }
});

const Data = mongoose.model('Data', dataSchema);

export default Data;
