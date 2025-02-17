import { Logger } from '@aws-lambda-powertools/logger/lib/cjs/Logger'
import { BaseError, UnknownError } from './error'
import middy from '@middy/core'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import errorHandler from '../middleware/errorHandler'

describe('Error', () => {
  let mockLogger: Logger
  let middleware: middy.MiddlewareObj<
    APIGatewayProxyEvent,
    APIGatewayProxyResult
  >
  let testTargetError: BaseError
  let lambdaHandler: any
  let handler: any

  beforeEach(() => {
    mockLogger = { error: jest.fn() } as unknown as Logger
    middleware = errorHandler(mockLogger)
    testTargetError = new UnknownError('')
    lambdaHandler = async () => {
      throw testTargetError
    }
    handler = middy(lambdaHandler).use(middleware)
  })
  it('UnknownError', async () => {
    const errorResponse = await handler()
    const error = JSON.parse(errorResponse.body)
    const messages = error.messages
    expect(messages).toEqual(testTargetError.getMessages().messages)
    expect(errorResponse.statusCode).toBe(testTargetError.getHttpStatusCode())
  })

  beforeEach(() => {
    testTargetError = new UnknownError('')
    lambdaHandler = async () => {
      throw new Error()
    }
    handler = middy(lambdaHandler).use(middleware)
  })
  it('Errors that do not inherit base error（abnormal）', async () => {
    const errorResponse = await handler()
    const error = JSON.parse(errorResponse.body)
    const messages = error.messages
    expect(messages).toEqual(testTargetError.getMessages().messages)
    expect(errorResponse.statusCode).toBe(testTargetError.getHttpStatusCode())
  })

  beforeEach(() => {
    middleware = errorHandler(undefined)
    testTargetError = new UnknownError('')
    lambdaHandler = async () => {
      throw new Error()
    }
    handler = middy(lambdaHandler).use(middleware)
  })
  it('no logger abnormal', async () => {
    const errorResponse = await handler()
    const error = JSON.parse(errorResponse.body)
    const messages = error.messages
    expect(messages).toEqual(testTargetError.getMessages().messages)
    expect(errorResponse.statusCode).toBe(testTargetError.getHttpStatusCode())
  })
})
