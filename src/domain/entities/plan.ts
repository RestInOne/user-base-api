export type Characteristc = {
  key: string
  value: string
}

export class Plan {
  id!: string
  name!: string
  characteristics!: Characteristc[]
  companyId!: string
  price!: number
}
