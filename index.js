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
  for (var i=y; i < y + lines.length; i++) {
    tmp[i] = mergeString(tmp[i], lines[i - y], x)
  }

  if (typeof screen === 'string') return tmp.join('\n')
  else return tmp
}

// String, String -> String
function mergeString (src, string, x) {
  var res = src
  var extraCharsNeeded = (x + strlenAnsi(string)) - strlenAnsi(src)
  if (extraCharsNeeded > 0) {
    res += (new Array(extraCharsNeeded).fill(' ')).join('')
  }

  return sliceAnsi(res, 0, x) + string + sliceAnsi(res, x + strlenAnsi(string))
}

// Like String#slice, but taking ANSI codes into account
function sliceAnsi (str, from, to) {
  var len = 0
  var insideCode = false
  var res = ''
  to = (to === undefined) ? str.length : to

  for (var i=0; i < str.length; i++) {
    var chr = str.charAt(i)
    if (chr === '\033') insideCode = true
    if (!insideCode) len++
    if (chr === 'm' && insideCode) insideCode = false

    if (len > from && len <= to) {
      res += chr
    }
  }

  return res
}

// Length of 'str' sans ANSI codes
function strlenAnsi (str) {
  var len = 0
  var insideCode = false

  for (var i=0; i < str.length; i++) {
    var chr = str.charAt(i)
    if (chr === '\033') insideCode = true
    if (!insideCode) len++
    if (chr === 'm' && insideCode) insideCode = false
  }

  return len
}
