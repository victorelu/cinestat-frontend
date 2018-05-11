export function getRandomColor (opacity) {
  let num = Math.round(0xffffff * Math.random())
  let r = num >> 16
  let g = num >> 8 & 255
  let b = num & 255
  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')'
}
