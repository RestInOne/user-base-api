export enum TicketType {
  EMAIL_VERIFICATION = 'email_verification',
  RESET_PASSWORD = 'reset_password'
}

export enum TicketSituation {
  OPEN = 'open',
  CLOSE = 'close'
}

export type Ticket = {
  id: string
  hash: string
  userId: string
  type: TicketType
  situation: TicketSituation
  createdAt: Date
}
