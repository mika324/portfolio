import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import middy from '@middy/core'
import { BaseError, UnknownError } from '../models/error'
import type { Logger } from '@aws-lambda-powertools/logger/lib/cjs/Logger'

const errorHandler = (
  logger: Logger | undefined
): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const onError: middy.MiddlewareFn<
    APIGatewayProxyEvent,
    APIGatewayProxyResult
  > = async (request): Promise<APIGatewayProxyResult> => {
    // どのようなエラーであっても、下記を満たす
    // レスポンスを返す
    // エラーの詳細内容を出力する
    if (!(request.error instanceof BaseError)) {
      logger?.error('An unknown error occurred.', { error: request.error }) ??
        console.error(request.error)

      const error = new UnknownError(
        request.error?.message ?? 'An unknown error occurred.'
      )

      return createErrorResponse(error)
    }

    request.error.logs(logger)

    return createErrorResponse(request.error)
  }

  return {
    onError: onError
  }
}

const createErrorResponse = (error: BaseError): APIGatewayProxyResult => {
  const messages = error.getMessages()
  const statusCode = error.getHttpStatusCode()
  return {
    statusCode: statusCode,
    body: JSON.stringify(messages)
  }
}

export default errorHandler
