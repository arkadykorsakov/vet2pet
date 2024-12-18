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

export function formatDateTime(val, format = 'datetime') {
  if (!val) return ''

  const optionsMap = {
    datetime: {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    },
    date: {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric'
    },
    time: {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }
  }

  const options = optionsMap[format]
  if (!options) throw new Error(`Unknown format: ${format}`)

  const formatter = new Intl.DateTimeFormat('ru-RU', options)
  const formatted = formatter.format(val)

  return format === 'datetime' ? formatted.replace(',', ' в') : formatted
}
