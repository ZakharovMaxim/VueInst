function formatdate (dateStr) {
  if (typeof dateStr !== 'string') return
  const date = new Date(dateStr)
  const now = new Date()
  const diff = (now - date) / 1000
  let result = ''
  if (diff < 60) result = 'Только что'
  else if (diff < 60 * 60) result = Math.floor(diff / 60) + ' минут назад'
  else if (diff < 60 * 60 * 24) result = Math.floor(diff / 60 / 60) + ' часов назад'
  else if (diff < 60 * 60 * 24 * 7) result = Math.floor(diff / 60 / 60 / 24) + ' дней назад'
  else if (now.getFullYear() === date.getFullYear()) result = `${doubleDecimal(date.getDate())} ${getMonth(date.getMonth()).toUpperCase()}`
  else result = `${doubleDecimal(date.getDate())} ${getMonth(date.getMonth()).toUpperCase()}, ${date.getFullYear()}`
  return result
}
function doubleDecimal (n) {
  return n.toString().length < 2 ? '0' + n : n
}
function getMonth (index) {
  const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
  return months[index]
}
export default formatdate
