import type { Logger } from '@aws-lambda-powertools/logger/lib/cjs/Logger'
import type { schemas } from '@openapi-generated'
import type { z } from 'zod'

type Messages = z.infer<typeof schemas.Messages>

export abstract class BaseError extends Error {
  abstract getMessages(): Messages
  abstract getHttpStatusCode(): number
  logs(logger: Logger | undefined) {
    if (logger) {
      logger.error(this.message)
    }
    console.error(this.message)
  }
}

export class UnknownError extends BaseError {
  constructor(message: string) {
    super(message)
    this.name = 'UnknownError'
  }

  getMessages() {
    return {
      messages: [
        '申し訳ありません。現在システムに一時的な不具合が発生しております。後ほど再度お試しください。'
      ]
    }
  }

  getHttpStatusCode(): number {
    return 500
  }
}

export class ValidationError extends BaseError {
  public readonly details: ValidationErrorDetail[]

  constructor(message: string, details: ValidationErrorDetail[]) {
    super(message)
    this.name = 'ValidationError'
    this.details = details
  }

  getMessages() {
    const messages = this.details.map((detail) => {
      switch (detail.errorCode) {
        case 'VLD_REQUIRED':
          return `${detail.field}は必須項目です。`
        case 'VLD_INVALID_FORMAT':
          return `${detail.field}の形式が正しくありません。`
        case 'VLD_TYPE_MISMATCH':
          return `${detail.field}の型が正しくありません。`
        case 'VLD_OUT_OF_RANGE':
          return `${detail.field}の値が範囲外です。`
        case 'VLD_UNKNOWN_ENUM':
          return `${detail.field}の値はサポートされていません。`
        case 'VLD_DUPLICATE':
          return `${detail.field}の値はすでに存在しています。`
        default:
          return '不明なエラーが発生しました。'
      }
    })
    return { messages }
  }

  getHttpStatusCode(): number {
    return 400
  }
}

export type ValidationErrorDetail = {
  field: string
  errorCode: ValidationErrorCode
}

export type ValidationErrorCode =
  | 'VLD_REQUIRED'
  | 'VLD_INVALID_FORMAT'
  | 'VLD_TYPE_MISMATCH'
  | 'VLD_OUT_OF_RANGE'
  | 'VLD_UNKNOWN_ENUM'
  | 'VLD_DUPLICATE'

export class AuthUnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message)
    this.name = 'AuthUnauthorizedError'
  }

  getMessages() {
    return { messages: ['認証情報が見つかりませんでした。'] }
  }

  getHttpStatusCode(): number {
    return 401
  }
}

export class AuthForbiddenError extends BaseError {
  constructor(message: string) {
    super(message)
    this.name = 'AuthForbiddenError'
  }

  getMessages() {
    return { messages: ['権限が不足しています。'] }
  }

  getHttpStatusCode(): number {
    return 403
  }
}

export class AuthTokenError extends BaseError {
  constructor(message: string) {
    super(message)
    this.name = 'AuthTokenError'
  }

  getMessages() {
    return { messages: ['認証トークンの有効期限が切れています。'] }
  }

  getHttpStatusCode(): number {
    return 401
  }
}

export class AuthTokenInvalidError extends BaseError {
  constructor(message: string) {
    super(message)
    this.name = 'AuthTokenInvalidError'
  }

  getMessages() {
    return { messages: ['不正な認証トークンです。'] }
  }

  getHttpStatusCode(): number {
    return 401
  }
}

export class AuthAPIKeyInvalidError extends BaseError {
  constructor(message: string) {
    super(message)
    this.name = 'AuthAPIKeyInvalidError'
  }

  getMessages() {
    return { messages: ['不正なAPI Keyです。'] }
  }

  getHttpStatusCode(): number {
    return 401
  }
}

export class AuthLockedError extends BaseError {
  constructor(message: string) {
    super(message)
    this.name = 'AuthLockedError'
  }

  getMessages() {
    return { messages: ['アカウントがロックされています。'] }
  }

  getHttpStatusCode(): number {
    return 423
  }
}

export class AuthCredentialsExpiredError extends BaseError {
  constructor(message: string) {
    super(message)
    this.name = 'AuthCredentialsExpiredError'
  }

  getMessages() {
    return { messages: ['ユーザー名またはパスワードが正しくありません。'] }
  }

  getHttpStatusCode(): number {
    return 401
  }
}

export class AuthResetCodeExpiredError extends BaseError {
  constructor(message: string) {
    super(message)
    this.name = 'AuthResetCodeExpiredError'
  }

  getMessages() {
    return { messages: ['リセットコードが有効期限切れです。'] }
  }

  getHttpStatusCode(): number {
    return 410
  }
}
