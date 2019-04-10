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
  var res = src
  var extraCharsNeeded = (x + util.strlenAnsi(string)) - util.strlenAnsi(src)
  if (extraCharsNeeded > 0) {
    res += (new Array(extraCharsNeeded).fill(' ')).join('')
  }

  return util.sliceAnsi(res, 0, x) + string + util.sliceAnsi(res, x + util.strlenAnsi(string))
}
