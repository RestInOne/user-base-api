import mongoose, { Schema } from 'mongoose'

const TicketSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
  hash: {
    type: String,
    unique: true,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['email_verification', 'reset_password']
  },
  situation: {
    type: String,
    required: true,
    enum: ['open', 'close']
  },
  createdAt: {
    type: Date,
    required: true
  }
})

export const TicketMongoDBModel = mongoose.model('Ticket', TicketSchema)
