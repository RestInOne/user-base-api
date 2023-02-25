import axios from 'axios'
import { injectable } from 'inversify'
import { HttpClientDTO, IHttpClient } from '../../application/contracts/http-client'
import { ApplicationError } from '../../domain/errors/application'

@injectable()
export class AxiosHttpClient implements IHttpClient {
  async get (input: HttpClientDTO.Input): Promise<HttpClientDTO.Output> {
    try {
      const { data } = await axios.get(input.url, { headers: input.headers, params: input.params })
      return data
    } catch (error) {
      console.error(`Error processing the request: ${input.url}`, error)
      throw new ApplicationError(`Error processing the request: ${input.url}`, 500)
    }
  }

  async post (input: HttpClientDTO.Input): Promise<HttpClientDTO.Output> {
    try {
      const { data } = await axios.post(input.url, input.data, { headers: input.headers, params: input.params })
      return data
    } catch (error) {
      console.error(`Error processing the request: ${input.url}`, error)
      throw new ApplicationError(`Error processing the request: ${input.url}`, 500)
    }
  }

  async put (input: HttpClientDTO.Input): Promise<HttpClientDTO.Output> {
    try {
      const { data } = await axios.put(input.url, input.data, { headers: input.headers, params: input.params })
      return data
    } catch (error) {
      console.error(`Error processing the request: ${input.url}`, error)
      throw new ApplicationError(`Error processing the request: ${input.url}`, 500)
    }
  }

  async patch (input: HttpClientDTO.Input): Promise<HttpClientDTO.Output> {
    try {
      const { data } = await axios.patch(input.url, input.data, { headers: input.headers, params: input.params })
      return data
    } catch (error) {
      console.error(`Error processing the request: ${input.url}`, error)
      throw new ApplicationError(`Error processing the request: ${input.url}`, 500)
    }
  }

  async delete (input: HttpClientDTO.Input): Promise<HttpClientDTO.Output> {
    try {
      const { data } = await axios.delete(input.url, { headers: input.headers, params: input.params })
      return data
    } catch (error) {
      console.error(`Error processing the request: ${input.url}`, error)
      throw new ApplicationError(`Error processing the request: ${input.url}`, 500)
    }
  }
}
