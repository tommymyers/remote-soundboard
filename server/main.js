const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const player = require('play-sound')(opts = {})
const buttons = require('./buttons')

const app = express()
app.use(bodyparser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/button', (req, res) => {
    res.send(buttons.buttons)
})

app.post('/button', (req, res) => {
    const sound_to_play = req.body.button + '.mp3'
    player.play(path.join(__dirname, 'audio', sound_to_play), function(err){
        if (err) console.log('error', err.message, err.stack)
      })
    res.send({})
})

const port = process.env.port || 5000
app.listen(port, (err) => {
    console.log(`server running on port ${port}`)
})