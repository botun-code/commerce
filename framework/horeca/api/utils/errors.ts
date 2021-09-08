import type { Response } from '@vercel/fetch'

// Used for GraphQL errors
export class HorecaGraphQLError extends Error {}

export class HorecaApiError extends Error {
  status: number
  res: Response
  data: any

  constructor(msg: string, res: Response, data?: any) {
    super(msg)
    this.name = 'HorecaApiError'
    this.status = res.status
    this.res = res
    this.data = data
  }
}

export class HorecaNetworkError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = 'HorecaNetworkError'
  }
}
