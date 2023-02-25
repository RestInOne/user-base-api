export interface IHttpClient {
  get: (request: HttpClientDTO.Input) => Promise<HttpClientDTO.Output>
  post: (request: HttpClientDTO.Input) => Promise<HttpClientDTO.Output>
  put: (request: HttpClientDTO.Input) => Promise<HttpClientDTO.Output>
  patch: (request: HttpClientDTO.Input) => Promise<HttpClientDTO.Output>
  delete: (request: HttpClientDTO.Input) => Promise<HttpClientDTO.Output>
}

export namespace HttpClientDTO {
  export type Input = {
    url: string
    data?: any
    headers?: any
    params?: any
  }

  export type Output = any
}
