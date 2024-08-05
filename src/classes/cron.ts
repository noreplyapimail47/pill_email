import cron from 'node-cron'
import { env } from 'process'
import { Mailer } from './mailer'
import { availableTexts, birthdayText } from '../assets/messagesToSend'
import fs from 'fs'
import { getDayOfTheYear, sortImagesByName, todayIsHerBirthDayInBuenosAires } from '../utils/utils'
import { BUENOS_AIRES_TIMEZONE, UNIQUE_IMAGE_CID } from '../utils/constants'
import { getEmailHtmlWithImage } from '../utils/emailTemplate'
require('dotenv').config({ path: '.env' })

const minute = env.MINUTE_TO_SEND_EMAIL
const hour = env.HOUR_TO_SEND_EMAIL
const dayOfMonth = env.DAY_OF_MONTH_TO_SEND_EMAIL
const month = env.MONTH_TO_SEND_EMAIL
const dayOfWeek = env.DAY_OF_WEEK_TO_SEND_EMAIL

const timeToSendEmail = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`

const cronOptions = {
  scheduled: true,
  timezone: BUENOS_AIRES_TIMEZONE
}

export class Cron {
  constructor() {}

  public start(): void {
    cron.schedule(timeToSendEmail, this.functionToExecute, cronOptions)
  }

  private async functionToExecute(): Promise<void> {
    const allImages = fs.readdirSync('./src/assets/images')
    const allImagesSorted = sortImagesByName(allImages)

    const dayOfTheYear = getDayOfTheYear()
    const textNumber = (dayOfTheYear - 1) % availableTexts.length
    const imageNumber = (dayOfTheYear - 1) % allImagesSorted.length
    console.log('DAY OF THE YEAR / TEXT NUMBER / IMAGE NUMBER: ', dayOfTheYear, textNumber, imageNumber)

    const subject = 'Recordatorio de pastillas'
    const from = env.EMAIL_USER
    const text = todayIsHerBirthDayInBuenosAires() ? birthdayText : availableTexts[textNumber]
    const html = getEmailHtmlWithImage(text)
    const selectedImageFileName = allImagesSorted[imageNumber]

    const attachments = [
      {
        filename: selectedImageFileName,
        path: `./src/assets/images/${selectedImageFileName}`,
        cid: UNIQUE_IMAGE_CID // Same cid value as in the html img src
      }
    ]

    const emailOptions1 = {
      from,
      to: env.EMAIL_TO_SEND,
      subject,
      html,
      attachments
    }
    const emailOptions2 = {
      from,
      to: env.SECOND_EMAIL_TO_SEND,
      subject,
      html,
      attachments
    }
    const mailer = new Mailer()

    const [isOk1, msg1] = await mailer.sendEmail(emailOptions1)
    const [isOk2, msg2] = await mailer.sendEmail(emailOptions2)

    if (!isOk1) console.error('\nError sending email to first email\n')
    else console.log(msg1)

    if (!isOk2) console.error('\nError sending email to second email\n')
    else console.log(msg2)
  }
}
