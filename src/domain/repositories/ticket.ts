import { Ticket } from '../entities/ticket'

export interface ITicketRepository {
  save: (ticket: Ticket) => Promise<Ticket>
  findByHash: (hash: string) => Promise<Ticket | null>
  find: (query: Partial<Ticket>) => Promise<Ticket[]>
  edit: (id: string, data: Partial<Ticket>) => Promise<Ticket>
}
