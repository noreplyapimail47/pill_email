require('dotenv').config({ path: '.env' })
import { env } from 'process'
import nodemailer, { Transporter } from 'nodemailer'
import { IEmailOptions } from 'interfaces/email-options.interface'

const MAXIMUM_EMAIL_TRIES = 3

export class Mailer {
  private transporter: Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASSWORD
      }
    })
  }

  async sendEmail(options: IEmailOptions, tries: number = 0): Promise<[boolean, string]> {
    try {
      await this.transporter.sendMail(options)
      const date = new Date().toLocaleString()
      const msg = `Email sent on ${date}`
      return [true, msg]
    } catch (error) {
      console.error(`Error sending email on ${new Date().toLocaleString()}:\n`)
      console.error(error)
      if (tries < MAXIMUM_EMAIL_TRIES) return this.sendEmail(options, tries + 1)
      else {
        const errorMsg = `Error sending email after ${MAXIMUM_EMAIL_TRIES} tries on ${new Date().toLocaleString()}:\n`
        console.log(errorMsg)
        return [false, errorMsg]
      }
    }
  }
}
