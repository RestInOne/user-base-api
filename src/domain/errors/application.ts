export class ApplicationError {
  constructor (
    private readonly message: string,
    private readonly code: number
  ) { }
}
