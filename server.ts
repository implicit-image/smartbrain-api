
import express from 'express'
import fs from 'fs'

const app = express()
const PORT = 3001

//middleware
// we will parse json for logging in and signing in
app.use(express.json())
//and urlencoded for parsing forms
app.use(express.urlencoded({extended: true}))


//root
app.get('/', (req, res) => {
  res.send('this is working')
})

/*
 *  / -> res 'this is working'
 *  /signin -> POST success/fail
 *  /signup -> POST created user
 *  /profile/:id -> GET user with id $id
 *  /image -> PUT user     update the number of detections user performed
 */


app.listen(PORT)
