
import express from 'express'
import fs from 'fs'

const app = express()
const PORT: number = 3001

//middleware
// we will parse json for logging in and signing in
app.use(express.json())
//and urlencoded for parsing forms
app.use(express.urlencoded({extended: true}))

//root
//  / -> res 'this is working'
app.get('/', (req, res) => {
  res.send('this is working')
})


//  /signin -> POST success/fail
app.post('/signin', (req, res) => {
  console.log(req.body)
  // if there is no response it will hang
  res.send(req.body)
})


// /signup -> POST created user
app.post('/signup', (req, res) => {

})

//  /profile/:id -> GET user with id $id
app.get('/profile/:id', (req, res) => {

})


// /image -> PUT user     update the number of detections user performed
app.put('/image', (req, res) => {
  res.send(req.body)
})

app.listen(PORT)
