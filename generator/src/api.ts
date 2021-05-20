import express from 'express'
import path from 'path'
import BalenaAudio from './audio'
import NoiseGenerator from './generator'
import asyncHandler from 'express-async-handler'

export default class API {
  private readonly api = express()

  constructor (public noise: NoiseGenerator, public audio: BalenaAudio) {
    this.api.use(express.json())

    this.api.post('/start', (req, res) => {
      noise.start(req.body.type)
      res.send('OK')
    })

    this.api.post('/stop', (_req, res) => {
      noise.stop()
      res.send('OK')
    })

    this.api.get('/volume', asyncHandler(async (_req, res) => res.json(await this.audio.getVolume())))
    this.api.post('/volume', asyncHandler(async (req, res) => res.json(await this.audio.setVolume(req.body.volume))))

    this.api.use('/', express.static(path.join(__dirname, 'ui')))
  }

  public listen (port: number): void {
    this.api.listen(port, () => {
      console.log(`Running on port ${port}`)
    })
  }
}
