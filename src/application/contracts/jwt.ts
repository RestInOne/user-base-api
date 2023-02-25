export interface IJwt {
  generate: (data: any, expires: string) => string
  verify: (token: string) => any
}
