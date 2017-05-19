express = require('express')
app = express()
http = require('http').Server(app)
io = require('socket.io')(http)
config = require('./config.json')
app.use express.static(__dirname + '/../client')

io.on 'connection', (socket) ->
  console.log 'Somebody connected!'
  # Write your code here
  return

  serverPort = process.env.PORT or config.port

http.listen serverPort, ->
  console.log 'Server is listening on port ' + serverPort
  return
