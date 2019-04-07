module.exports = { sliceAnsi, strlenAnsi }
var isFullwidth = require("is-fullwidth-code-point")

// Like String#slice, but taking ANSI codes into account
function sliceAnsi (str, from, to) {
  var len = 0
  var insideCode = false
  var res = ''
  to = (to === undefined) ? str.length : to

  for (var i=0; i < str.length; i++) {
    var chr = str.charAt(i)
    if (chr === '\033') insideCode = true
    if (!insideCode) len += chrlen(chr)
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
    if (!insideCode) len += chrlen(chr)
    if (chr === 'm' && insideCode) insideCode = false
  }

  return len
}

function chrlen (chr) {
    return isFullwidth(chr.codePointAt(0)) ? 2 : 1
}
