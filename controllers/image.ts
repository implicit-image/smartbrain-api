import { Response } from 'express'
import { User }  from '../types'

//@ts-ignore
const Clarifai = require('clarifai')


const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY
})


const handleImage = (req: any, res: any) => (db: any) => {
  const { id, url, modelId } = req.body // id will be included in the body of the request


  app.models
    .predict(modelId, url)
    .then((response: any) => {
      if (response.status.description === 'Ok') {
        db('users')
          .returning('*')
          .where({ id: id })
          .increment('entries', 1)
          .then((found: any) => {
            res.status(200).json({ user: found[0], response })
          })
          .catch((e : Error) => {
            res
              .status(400)
              .json("unable to get entries")
          })
      }
    })
    .catch((e: Error) => {
      res.status(404).json(e)
    })


}


export default handleImage
