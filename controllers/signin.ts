import { User } from '../types'



const handleSignIn = (req: any, res: any, db: any, bcrypt: any) => {
  // if there is no response it will hang

  const { email, password } = req.body

  db('login')
    .join('users', 'users.email', 'login.email')
    .select('*')
    .where('login.email', email)
    .then((info: any) => {
      console.log(info)
      bcrypt
        .compare(password, info[0].hash)
        .then((identical: boolean) => {
          console.log(`COMPARISON RESULT IS: ${identical}`)
          if (identical) {
            delete info[0].hash
            res.json(info[0])
          }
        })})
    .catch((err: Error) => res.status(500).json(err))
}

export default handleSignIn
