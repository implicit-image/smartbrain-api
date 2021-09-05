
import express from 'express'
import bcrypt from 'bcrypt'


const database = {
  users: [
    {
      id: '1',
      name: 'John',
      email: 'john@gmail.com',
      entries: 0,
      joined: new Date()
    },
    {
      id: '2',
      name: 'Sally',
      email: 'sally@gmail.com',
      entries: 0,
      joined: new Date()
    }
  ] as User[],
  login: [
    {
      id: '23',
      hash: '',
      email: 'john@gmail.com'
    }
  ]

}

interface User {
  id: string,
  name: string,
  email: string,
  password: string,
  entries: number,
  joined: Date
}


const app = express()
const PORT: number = 3001
const SALT_ROUNDS = 10
//middleware
// we will parse json for logging in and signing in
app.use(express.json())
//and urlencoded for parsing forms
app.use(express.urlencoded({extended: true}))

//root
//  / -> res 'this is working'
app.get('/', (req, res) => {
  res.send(database.users)
})


//  /signin -> POST success/fail
app.post('/signin', (req, res) => {
  // if there is no response it will hang
  const found = database.users
    .filter((u: User) => u.email == req.body.email && u.password == req.body.password)[0]

  found
    ? res.json(found)
    : res.status(400).json('error logging in')

})


// /signup -> POST created user
app.post('/signup', (req, res) => {

  const { name, email, password } = req.body

  bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
    console.log(hash)
    const user: User = {
      id: '3',
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      entries: 0,
      joined: new Date()
    }

    res.json(user)
  })



  // database.users.push(user)
})


//  /profile/:id -> GET user with id $id
app.get('/profile/:id', (req, res) => {
  const id: string = req.params.id //params contains url parameters
  const found: User | undefined = database.users   // ids are unique
    .filter((user: User) => user.id == id)[0]

  found
    ? res.json(found)
    : res.status(404).json('user not found')
})


// /image -> PUT user     update the number of detections user performed
app.put('/image', (req, res) => {
  const { id } = req.body // id will be included in the body of the request

  const found: User | undefined = database.users.filter((user: User) => user.id == id)[0]

  if (found) {

    const updated: User = { ...found, entries: found.entries + 1 }

    database.users = database.users
      .map((user: User) => user.id == updated.id ? updated : user)

    res.json(updated)
  } else {
    res.status(404).json('user not found')
  }

})

app.listen(PORT)
