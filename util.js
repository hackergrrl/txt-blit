module.exports = { sliceAnsi, strlenAnsi }
var stripAnsi = require('strip-ansi')
var wcwidth = require('wcwidth')

// Like String#slice, but taking ANSI codes into account.
function sliceAnsi (str, from, to) {
  var len = 0
  var insideCode = false
  var res = ''
  to = (to === undefined) ? str.length : to

  for (var i=0; i < str.length; i++) {
    var chr = str.charAt(i)
    if (chr === '\033') insideCode = true
    if (!insideCode) len += wcwidth(chr)
    if (chr === 'm' && insideCode) insideCode = false

    if (len > from && len <= to) {
      res += chr
    }
  }

  return res
}

// Returns the horizontal visual extent (# of fixed-width chars) a string takes
// up, taking ANSI escape codes into account. Assumes a UTF-8 encoded string.
function strlenAnsi (str) {
  str = stripAnsi(str)
  return wcwidth(str)
}
