import serverlessExpress from '@vendia/serverless-express'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/hello', (_, res) => {
  res.status(200).send({
    message: 'Hello serverless-express',
  })
})

app.get('/ping', (_, res) => {
  res.status(200).send({
    message: 'pong',
  })
})

export const handler = serverlessExpress({ app })
