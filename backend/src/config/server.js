const express = require('express')
const bodyParser = require('body-parser')


const server = express()

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

const port = 3003
server.listen(port, function(){
    console.log(`Server rodando em http://127.0.0.1:${port}`)
})

module.exports = server 