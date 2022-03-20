import { Response } from 'express'
import { User }  from '../types'

//@ts-ignore
const Clarifai = require('clarifai')


const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY
})


const handleImage = (req: any, res: any) => (db: any) => {
  const { id, imgUrl, modelId } = req.body // id will be included in the body of the request

  app.models
    .predict(modelId, imgUrl)
    .then((response: Response) => {
      if (response.statusCode == 200) {
        db('users')
          .returning('*')
          .where({ id: id })
          .increment('entries', 1)
          .then((user: User) => {
            console.log(user)
            res.json(user)
          })
          .catch((e : Error) => {
            console.log(e)
            res
              .status(400)
              .json("unable to get entries")
          })
      }
    })
    .catch((err: Error) => console.log(err))


}


export default handleImage
