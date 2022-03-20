import knex, { Knex } from 'knex'


const handleSignup = (req: any, res: any, db: Knex<any, any>, bcrypt: any) => {
  const { name, email, password } = req.body

  const hash = bcrypt.hashSync(password, 10)

  db.transaction((trx) => {

    //first insert information to login table
    return trx
      .select('email')
      .from('login')
      .where({email: email})
      .then((isUser) => {
        if (!isUser) {
          throw new Error(`\n user ${email} already exists\n`)
        }
        return trx
          .table('login')
          .returning('*')
          .insert({
            email,
            hash
          })
          .then((inserts) => {
            console.log(inserts)
            return trx
              .table('users')
              .returning('*')
              .insert({
                name,
                email,
                joined: new Date()
              })
          })
          .then((inserts) => {
            res.status(201).json(inserts[0])
          })
      })
      .catch((err: Error) => {
        console.log(err)  //TODO add proper error handling
      })
  })
}


export default handleSignup
