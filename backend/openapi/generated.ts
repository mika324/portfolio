import { z } from 'zod'

const Messages = z
  .object({
    messages: z.array(z.string())
  })
  .passthrough()

export const schemas = { Messages }
