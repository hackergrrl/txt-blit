var util = require('./util')
module.exports = blit

// Applies 'lines' to 'screen' at coordinates x/y
function blit (screen, lines, x, y) {
  var tmp = screen
  if (typeof screen === 'string') tmp = screen.split('\n')

  // add any extra needed lines
  var extraLinesNeeded = (y + lines.length) - tmp.length
  if (extraLinesNeeded > 0) {
    tmp.push.apply(tmp, new Array(extraLinesNeeded).fill(''))
  }

  // patch lines
  for (var i = y; i < y + lines.length; i++) {
    tmp[i] = mergeString(tmp[i], lines[i - y], x)
  }

  if (typeof screen === 'string') return tmp.join('\n')
  else return tmp
}

// String, String -> String
function mergeString (src, string, x) {
  var extraWidthNeeded = (x - 1 + util.strlenAnsi(string)) - util.strlenAnsi(src)
  if (extraWidthNeeded > 0) {
    src += (new Array(extraWidthNeeded).fill(' ')).join('')
  }

  return util.sliceAnsi(src, 0, x) + string + util.sliceAnsi(src, x + util.strlenAnsi(string))
}
