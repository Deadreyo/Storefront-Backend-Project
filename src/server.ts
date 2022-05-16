import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'

const app: express.Application = express()
const address = process.env.ENV=="dev"? 3000 : 8080

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(address, function () {
    console.log(`starting app on: ${address}`)
})

