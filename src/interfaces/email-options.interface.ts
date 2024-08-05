import { IAttachment } from './attachment.interface'

export interface IEmailOptions {
  from: string
  to: string
  subject: string
  text?: string
  html?: string
  attachments?: IAttachment[]
}
