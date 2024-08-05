import { UNIQUE_IMAGE_CID } from './constants'

export const getEmailHtml = (text: string): string => {
  return `<h3>${text}</h3>`
}

export const getEmailHtmlWithImage = (text: string): string => {
  return `<h3>${text}</h3><h3>Este es el recuerdo de hoy mi amorr:</h3><img src="cid:${UNIQUE_IMAGE_CID}" alt="Pills reminder image" />`
}
