export function formatNumber(value, options = {}) {
  const {
    locale = 'ru-RU',
    formatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  } = options

  if (isNaN(value)) return ''

  return new Intl.NumberFormat(locale, formatOptions).format(value)
}

export function formatCurrency(value, options = {}) {
  const { locale = 'ru-RU', currency = 'RUB', showDecimals = true } = options

  const formatOptions = {
    style: 'currency',
    currency,
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0
  }

  return new Intl.NumberFormat(locale, formatOptions).format(value)
}

export function formatTime(date) {
  const options = {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }

  const formatter = new Intl.DateTimeFormat('ru-RU', options)
  const formattedDate = formatter.format(date)

  return formattedDate.replace(',', ' в')
}
