var blit = require('.')
var neatLog = require('neat-log')
var chalk = require('chalk')

var app = neatLog(view)
app.use(countTheSeconds)

var colours = [
  chalk.black,
  chalk.red,
  chalk.green,
  chalk.yellow,
  chalk.blue,
  chalk.magenta,
  chalk.cyan,
  chalk.white,
  chalk.gray
]

function view (state) {
  var screen = []

  var x = Math.floor(Math.sin(state.seconds / 5.0) * 10 + process.stdout.columns / 2)
  blit(screen, renderHelloBox(), x, 3)
  blit(screen, renderTimer(state), 10, 10)

  return screen.join('\n')
}

function countTheSeconds (state, bus) {
  state.seconds = 0
  setInterval(function () {
    state.seconds++
    bus.emit('render')
  }, 200)
}

function renderTimer (state) {
  var colourize = colours[Math.floor(Math.random() * colours.length)]

  return [
    colours[7]('|TIME: ') + colourize(state.seconds) + colours[7](' |')
  ]
}

function renderHelloBox () {
  return [
    '|-----------------------|',
    '|                       |',
    '|      HELLO THERE      |',
    '|    ~~~~~~~~~~~~~~~    |',
    '|                       |',
    '|-----------------------|'
  ]
}
