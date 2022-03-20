import { User } from '../types'

const handleProfileGet = (req: any, res: any, db: any) => {
  const id: string = req.params.id //params contains url parameters
  db('users')
    .returning('*')
    .select('*')
    .where({ id: id })
    .then((user: User) => {
      res.json(user)
    })
    .catch((err: Error) => {
      res.status(404).json("user not found")
    })
}

export default handleProfileGet
