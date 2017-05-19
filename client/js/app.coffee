layerName = undefined
playerNameInput = document.getElementById('playerNameInput')
socket = undefined
screenWidth = window.innerWidth
screenHeight = window.innerHeight
c = document.getElementById('cvs')
canvas = c.getContext('2d')

startGame = ->
  playerName = playerNameInput.value.replace(/(<([^>]+)>)/ig, '')
  document.getElementById('gameAreaWrapper').style.display = 'block'
  document.getElementById('startMenuWrapper').style.display = 'none'
  socket = io()
  SetupSocket socket
  animloop()
  return

# check if nick is valid alphanumeric characters (and underscores)

validNick = ->
  regex = /^\w*$/
  console.log 'Regex Test', regex.exec(playerNameInput.value)
  regex.exec(playerNameInput.value) != null

SetupSocket = (socket) ->
  game.handleNetwork socket
  return

animloop = ->
  requestAnimFrame animloop
  gameLoop()
  return

gameLoop = ->
  game.handleLogic()
  game.handleGraphics canvas
  return

c.width = screenWidth
c.height = screenHeight
KEY_ENTER = 13
game = new Game

window.onload = ->
  'use strict'
  btn = document.getElementById('startButton')
  nickErrorText = document.querySelector('#startMenu .input-error')

  btn.onclick = ->
    # check if the nick is valid
    if validNick()
      startGame()
    else
      nickErrorText.style.display = 'inline'
    return

  playerNameInput.addEventListener 'keypress', (e) ->
    key = e.which or e.keyCode
    if key == KEY_ENTER
      if validNick()
        startGame()
      else
        nickErrorText.style.display = 'inline'
    return
  return

window.requestAnimFrame = do ->
  window.requestAnimationFrame or window.webkitRequestAnimationFrame or window.mozRequestAnimationFrame or (callback) ->
    window.setTimeout callback, 1000 / 60
    return
window.addEventListener 'resize', (->
  screenWidth = window.innerWidth
  screenHeight = window.innerHeight
  c.width = screenWidth
  c.height = screenHeight
  return
), true

