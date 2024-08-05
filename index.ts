require('dotenv').config({ path: '.env' })
import express, { Request, Response } from 'express'
import { Cron } from './src/classes/cron'
// import { getDayOfTheYear, sortImagesByName, todayIsHerBirthDay } from './src/utils/utils'
// import { availableTexts, birthdayText } from './src/assets/messagesToSend'
// import { UNIQUE_IMAGE_CID } from './src/utils/constants'
// import { getEmailHtmlWithImage } from './src/utils/emailTemplate'
// import { Mailer } from './src/classes/mailer'
// import fs from 'fs'

const app = express()
const cron = new Cron()

cron.start()

app.get('/', (_: Request, res: Response) => {
  res.status(200).json({ ok: true, msg: 'Server running.' })
})

// app.post('/', async (_: Request, res: Response) => {
//   const allImages = fs.readdirSync('./src/assets/images')
//   const allImagesSorted = sortImagesByName(allImages)

//   const dayOfTheYear = getDayOfTheYear()
//   const textNumber = (dayOfTheYear - 1) % availableTexts.length
//   const imageNumber = (dayOfTheYear - 1) % allImagesSorted.length

//   const subject = 'Recordatorio de pastillas'
//   const from = process.env.EMAIL_USER
//   const text = todayIsHerBirthDay() ? birthdayText : availableTexts[textNumber]
//   const selectedImageFileName = allImagesSorted[imageNumber]

//   const attachments = [
//     {
//       filename: selectedImageFileName,
//       path: `./src/assets/images/${selectedImageFileName}`,
//       cid: UNIQUE_IMAGE_CID // Same cid value as in the html img src
//     }
//   ]

//   const html = getEmailHtmlWithImage(text)
//   const emailOptions = { from, to: process.env.SECOND_EMAIL_TO_SEND, subject, html, attachments }
//   const mailer = new Mailer()

//   const [isOk, errorMsg] = await mailer.sendEmail(emailOptions)
//   if (isOk) return res.status(200).json({ ok: true, msg: 'Email sent.' })
//   res.status(500).json({ ok: false, msg: errorMsg })
// })

app.listen(process.env.PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${process.env.PORT}`)
})
