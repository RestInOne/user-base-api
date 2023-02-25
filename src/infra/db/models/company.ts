import mongoose, { Schema } from 'mongoose'

const CompanySchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  register: {
    type: String,
    required: true
  }
})

export const CompanyMongoDBModel = mongoose.model('Company', CompanySchema)
