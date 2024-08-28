var blit = require('.')

function renderHelloBox () {
  return [
    '|-----------------------|',
    '|                       |',
    '|      HELLO THERE      |',
    '|    ~~~~~~~~~~~~~~~    |',
    '|                       |',
    '|        🥰 🌸 😳       |',
    '|                       |',
    '|-----------------------|'
  ]
}

var screen = []   // empty; blank screen

blit(screen, renderHelloBox(), 2, 2)
blit(screen, renderHelloBox(), 25, 10)
blit(screen, renderHelloBox(), 10, 7)

console.log(screen.join('\n'))
