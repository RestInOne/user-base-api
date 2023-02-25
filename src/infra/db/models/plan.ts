import mongoose, { Schema } from 'mongoose'

const PlanSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  characteristics: {
    type: Array,
    required: true,
    default: []
  },
  companyId: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})

export const PlanMongoDBModel = mongoose.model('Plan', PlanSchema)
