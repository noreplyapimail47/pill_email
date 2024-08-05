import { BIRTHDAY_DAY, BIRTHDAY_MONTH, BUENOS_AIRES_TIMEZONE } from './constants'

export const getDayOfTheYear = (): number => {
  const now: any = new Date()
  const start: any = new Date(now.getFullYear(), 0, 0)
  const diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000
  const oneDay = 1000 * 60 * 60 * 24
  const buenosAiresIsOneDayBehind = getBuenosAiresIsOneDayBehind()
  const buenosAiresIsOneDayAhead = getBuenosAiresIsOneDayAhead()

  let buenosAiresDay = buenosAiresIsOneDayBehind ? Math.floor(diff / oneDay) - 1 : Math.floor(diff / oneDay)
  if (buenosAiresIsOneDayAhead) buenosAiresDay = Math.floor(diff / oneDay) + 1

  if (buenosAiresIsOneDayBehind) return buenosAiresDay === 0 ? 365 : buenosAiresDay
  if (buenosAiresIsOneDayAhead) return buenosAiresDay === 366 ? 1 : buenosAiresDay
  return buenosAiresDay
}

const getBuenosAiresIsOneDayBehind = (): boolean => {
  const currentDay = new Date().getDate()
  const currentDayInBuenosAires = new Date()
    .toLocaleString('en-US', { timeZone: BUENOS_AIRES_TIMEZONE })
    .split('/')[1]
  return currentDay > Number(currentDayInBuenosAires)
}

const getBuenosAiresIsOneDayAhead = (): boolean => {
  const currentDay = new Date().getDate()
  const currentDayInBuenosAires = new Date()
    .toLocaleString('en-US', { timeZone: BUENOS_AIRES_TIMEZONE })
    .split('/')[1]
  return currentDay < Number(currentDayInBuenosAires)
}

export const sortImagesByName = (images: string[]): string[] => {
  return images.sort((a, b) => {
    const aNumber = Number(a.split('.')[0])
    const bNumber = Number(b.split('.')[0])
    return aNumber >= bNumber ? 1 : -1
  })
}

export const todayIsHerBirthDayInBuenosAires = (): boolean => {
  const nowInBuenosAires = new Date().toLocaleString('en-US', { timeZone: BUENOS_AIRES_TIMEZONE }).split('/')
  const day = Number(nowInBuenosAires[1])
  const month = Number(nowInBuenosAires[0])
  console.log('BUENOS AIRES DAY: ', day)
  console.log('BUENOS AIRES MONTH: ', month)
  return day === BIRTHDAY_DAY && month === BIRTHDAY_MONTH
}
