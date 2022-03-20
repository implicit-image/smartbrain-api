
import express from 'express'
// TODO check how to use legacy require syntax
import bcrypt from 'bcrypt'
import cors from 'cors'
import knex from 'knex'
import dotenv from 'dotenv'

import handleSignup from './controllers/signup'
import handleProfileGet from './controllers/profile'
import handleSignIn from './controllers/signin'
import handleImage from './controllers/image'

dotenv.config()

const db = knex({
  client: 'pg',
  connection: {
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USER}`,
    password: '',
    database: `${process.env.DB_NAME}`
  },

})

const app = express()
const PORT = process.env.PORT
// const SALT_ROUNDS = 10


//middleware
app
  .use(express.json())
  .use(cors())


//and urlencoded for parsing forms
//  / -> res 'this is working'
app.get('/', (req, res) => {
  res.send('ok')
})

app.get('/key', (req, res) => {
  res.json({ key: process.env.CLARIFAI_API_KEY })
})

app.post('/signin', (req, res) => handleSignIn(req, res, db, bcrypt) )

app.post('/signup', (req, res) => handleSignup(req, res, db, bcrypt))

app.get('/profile/:id', (req, res) => handleProfileGet(req, res, db))

app.put('/image', (req, res) => handleImage(req, res)(db))


app.listen(PORT)
