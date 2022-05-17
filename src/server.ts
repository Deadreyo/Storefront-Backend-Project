import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import userStore from './models/userModel'
import routes from './routes'

export const app: express.Application = express()
const address = process.env.ENV=="dev"? 3030 : 8060

app.use(bodyParser.json())

app.use(routes);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(address, function () {
    console.log(`starting app on: ${address}`)
})
