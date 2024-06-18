const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get('/', (req, res) => {
  res.send('hello world')
})
app.get('/about', function(req,res){
    res.send("I am a hero")
})
app.get("/profile", function(req,res,next){
  return next(new Error("Not implemented"))

})
app.listen(3000)