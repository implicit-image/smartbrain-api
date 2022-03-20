import { User } from '../types'

const handleProfileGet = (req: any, res: any, db: any) => {
  const id: string = req.params.id //params contains url parameters
  db('users')
    .returning('*')
    .select('*')
    .where({ id: id })
    .then((user: User) => {
      console.log(user)
      res.json(user)
    })
    .catch((err: Error) => {
      console.log(err)
      res.status(404).json("user not found")
    })
}

export default handleProfileGet
