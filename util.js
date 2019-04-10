module.exports = { sliceAnsi, strlenAnsi, emojicount }
var isFullwidth = require("is-fullwidth-code-point")
var emojiRegex = require("emoji-regex")
var emojiPattern = emojiRegex()

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
    var tmplen = len - emojicount(str.substring(0, i+1))

    if (tmplen > from && tmplen <= to) {
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

  return len - emojicount(str)
}

function chrlen (chr) {
    if (isFullwidth(chr.codePointAt(0))) return 2
    return 1
}

function emojicount (str) {
    return (str.match(emojiPattern) || "").length
}
