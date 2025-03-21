import moment from 'moment'

export function formatDate (date: string, format: string) {
  return moment(date).locale('de-CH').format(format)
}