// load library and create app object
const express = require('express')
const app = express()
const path = require('path')
// "database"
let users = []
// Serve static files
app.use(express.static(__dirname + '/public'))
// home route
app.get('/', function (req, res) {  
    res.sendFile(__dirname + '/index.html')
})
/*------------ data routes ------------*/
// create a user with a name and score
app.get('/createUser', function(req, res){
    let user = {
        name: req.query.firstName,
        book: req.query.book
    }
    users.push(user)
console.log(`-------------------------------`)
    console.log(`First Name: ${user.name} 
Book Title: ${user.book}`)
    res.status(201).redirect('/')

})

// show all users
app.get('/showUsers', function(req, res){
    let data = JSON.stringify(users)  
    
    res.send(data)
})

app.get('/', function (req, res) {  
    res.sendFile(__dirname + '/index.html')
})
app.get('/request', function(req, res){
    res.sendFile(__dirname + "/request.html")
})


app.get('/show', function(req, res){
    // Array of All books from users_data
    let books = []
    let counts = {}
    for (let key of users) {
        books.push(key.book)
    }
    // Filtering Duplicated values into one Key/Value Pair
    for (let i = 0; i < books.length; i++) {
        if (counts[books[i]]) {
            counts[books[i]] += 1
        } else {
            counts[books[i]] = 1
        }
        
    }
    let fav = JSON.stringify(counts)
    res.send(fav)
})

app.listen(2001)
console.log("Listening at port 2001")