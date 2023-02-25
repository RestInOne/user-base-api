import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  companyId: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

export const UserMongoDBModel = mongoose.model('User', UserSchema)
