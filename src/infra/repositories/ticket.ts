import { injectable } from 'inversify'
import { Ticket } from '../../domain/entities/ticket'
import { ITicketRepository } from '../../domain/repositories/ticket'
import { TicketMongoDBModel } from '../db/models/ticket'

@injectable()
export class TicketRepository implements ITicketRepository {
  private toModel (data: any): Ticket {
    return {
      id: data.id,
      hash: data.hash,
      createdAt: data.createdAt,
      situation: data.situation,
      type: data.type,
      userId: data.userId
    }
  }

  async find (query: Partial<Ticket>): Promise<Ticket[]> {
    const ticketsData = await TicketMongoDBModel.find(query)

    return ticketsData.map(this.toModel)
  }

  async edit (id: string, data: Partial<Ticket>): Promise<Ticket> {
    const { id: _, createdAt, ...ticketData } = data

    await TicketMongoDBModel.updateOne({ id }, ticketData)

    const [ticket] = await this.find({ id })

    return ticket
  }

  async findByHash (hash: string): Promise<Ticket | null> {
    const ticketData = await TicketMongoDBModel.findOne({ hash })

    return this.toModel(ticketData)
  }

  async save (ticket: Ticket): Promise<Ticket> {
    const ticketData = await TicketMongoDBModel.create(ticket)

    return this.toModel(ticketData)
  }
}
