import mongoose, { Schema } from 'mongoose'

const KeySchema = new Schema({
  companyId: {
    type: String,
    unique: true,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  valid: {
    type: Boolean,
    required: true
  }
})

export const KeyMongoDBModel = mongoose.model('Key', KeySchema)
