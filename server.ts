
import express from 'express'
import bcrypt from 'bcrypt'
import cors from 'cors'





const database = {
  users: [
    {
      id: '1',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '2',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    }
  ] as User[],
  logins: [
    {
      id: '23',
      hash: '',
      email: 'john@gmail.com'
    }
  ] as LoginEntry[]
}

interface LoginEntry {
  id: string,
  hash: string,
  email: string
}


interface User {
  id: string,
  name: string,
  email: string,
  password: string,
  entries: number,
  joined: Date
}

interface Result {
  status: string,
  user: User
}

const app = express()
const PORT = 3001
const SALT_ROUNDS = 10



//middleware
// we will parse json for logging in and signing in
app.use(express.json())
//and urlencoded for parsing forms
app.use(cors())
//root
//  / -> res 'this is working'
app.get('/', (req, res) => {
  res.send(database.users)
})


//  /signin -> POST success/fail
app.post('/signin', (req, res) => {
  // if there is no response it will hang

  const { email, password } = req.body

  const found_user = database.users
    .filter((u: User) => u.email == email && u.password == password)[0]


  found_user
    ? res.json({ status: 'success', user: found_user })
    : res.status(404).json("user not found")

  // if (found_user) {
  //   const found_login = database.logins.filter((entry: LoginEntry) => {
  //     entry.email == found_user.email
  //   })[0]

  //   bcrypt
  //     .compare(rq_password, found_login.hash)
  //     .then((eq) => {
  //       console.log(eq)
  //     })
  //     .catch(err => res.status(404).json("error logging in"))
  // } else {
  //   res.status(400).json("error logging in")
  // }
})


// /signup -> POST created user
app.post('/signup', (req, res) => {

  const { name, email, password } = req.body

  if (! database.users.some((u: User) => u.email == email && u.password == password)) {
    const user: User = {
      id: '3',
      name: name,
      email: email,
      password: password,
      entries: 0,
      joined: new Date()
    }
    database.users.push(user)
    res.json({ status: 'success', user: user })
  } else {
    res.status(400).json("user already exists")
  }

  // bcrypt
  //   .hash(password, SALT_ROUNDS)
  //   .then((hash: string) => {
  //     console.log(hash)
  //     const user: User = {
  //       id: '3',
  //       name: name,
  //       email: email,
  //       entries: 0,
  //       joined: new Date()
  //     }

  //     database.users.push(user)
  //     console.log(database.users)
  //     res.json(user)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     res.status(400).json(req)
  //   })
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
