export default function(time) {
  // HANDLE TIMESTAMP
  const unixToDate = new Date(time*1000)
  let hours = unixToDate.getHours(),
      minutes = unixToDate.getMinutes(),
      seconds = unixToDate.getSeconds(),
      suf = hours > 12 ? "PM" : "AM"

  // CONVERT TO STANDARD TIME
  if (hours > 12) {
    hours -= 12
    suf = "PM"
  }
  // PAD SINGLE DIGITS IF PRESENT
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  // PAD SINGLE DIGITS IF PRESENT
  if (seconds < 10) {
    seconds = '0' + seconds
  }

  return `${hours}:${minutes}:${seconds}${suf}`
}