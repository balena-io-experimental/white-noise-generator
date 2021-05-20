import NoiseGenerator, { NoiseType } from './generator'
import API from './api'
import { checkInt } from './utils'
import BalenaAudio from './audio'

const config = {
  noiseType: process.env.NOISE_TYPE as NoiseType ?? 'ocean',
  noiseVolume: checkInt(process.env.NOISE_VOLUME) ?? 40,
  apiPort: checkInt(process.env.PORT) ?? 3000
}

async function init (): Promise<void> {
  const audio: BalenaAudio = new BalenaAudio('tcp:audio:4317')
  await audio.listen()
  await audio.setVolume(config.noiseVolume)
  
  const noise = new NoiseGenerator()
  const api = new API(noise, audio)
  api.listen(config.apiPort)
}

init()
