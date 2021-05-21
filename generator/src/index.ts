import NoiseGenerator, { NoiseType } from './generator'
import API from './api'
import { checkInt } from './utils'
import BalenaAudio from './audio'
import axios from 'axios'

const config = {
  noiseType: process.env.NOISE_TYPE as NoiseType ?? 'ocean',
  noiseVolume: checkInt(process.env.NOISE_VOLUME) ?? 40,
  apiPort: checkInt(process.env.PORT) ?? 3000
}

async function init (): Promise<void> {
  // openFleets: configure hostname -- Assert BALENA_SUPERVISOR env vars as they are set by io.balena.features.supervisor-api
  await axios.patch(`${process.env.BALENA_SUPERVISOR_ADDRESS as string}/v1/device/host-config?apikey=${process.env.BALENA_SUPERVISOR_API_KEY as string}`, { network: { hostname: 'balena' } })

  // Connect to audio block
  const audio: BalenaAudio = new BalenaAudio('tcp:audio:4317')
  await audio.listen()
  await audio.setVolume(config.noiseVolume)

  // Start noise generator and API
  const noise = new NoiseGenerator()
  const api = new API(noise, audio)
  api.listen(config.apiPort)
}

init()
