const express = require('express')
const port = 5500 || process.env.PORT
const app = express()
// score object
const scoreModel = require('./score')
// score cache
const scores = {
    scores: "test score"
}

app.listen(port, function(){
    console.log('Trivia score server listening on port ' + port)
})


app.get('/topscores', function(req,res){
    res.send(scores)
})


function updateCache(){
    
}