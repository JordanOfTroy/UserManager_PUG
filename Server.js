const express = require('express')
const path = require('path')
const {v4: uuidv4} = require('uuid')

const server = express()
const PORT = 3000

server.use(express.urlencoded({extended: false}))

server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'pug')



server.get('/', (req, res) => {
    res.render('index', {
        formTitle: 'Create a user',
        formType: 'create'
    })
})




server.listen(PORT, () => {
    console.log(`Master has given Dobby a port ${PORT}!\nDobby is free!!!`)
})