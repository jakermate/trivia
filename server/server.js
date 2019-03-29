const express = require('express')
const port = 5500 || process.env.PORT
const app = express()
// score object
const scoreModel = require('./models/score')
// score cache
const scores = {
    scores: "test score"
}
// startup

app.listen(port, function(){
    console.log('Trivia score server listening on port ' + port)
})

// score fetching

app.get('/topscores', function(req,res){
    res.send(scores)
})

// score tracking

app.post('/addscore', function(req,res){
    // post new score and rank in the score cache
    let newScore = req.score
    let user = req.userID

    // instantiate new score object
    let score = new scoreModel()

})


// question caching

app.post('/addquestions', function(req,res){
    console.log("Ready to parse received question set: " + req.body.questions+" Sent by user " + req.body.userID)
})

// log user score
app.post('/logscore', function(req,res){
    let scoreObject = req.body
    console.log('New score received from user id: ' + scoreObject.id)
})
