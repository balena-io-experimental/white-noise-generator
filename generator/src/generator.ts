import { ChildProcess, spawn } from 'child_process'

export type NoiseType = 'ocean' | 'white'

export default class NoiseGenerator {
  private ps: ChildProcess | undefined

  public start (type: NoiseType): void {
    this.stop()
    this.ps = spawn('play', this.getPlayArgs(type))
    this.ps.on('error', (err) => console.log(err))
  }

  public stop (): void {
    if (this.ps != null) {
      this.ps.kill('SIGINT')
    }
  }

  private getPlayArgs (type: NoiseType): string[] {
    let args: string [] = []

    switch (type) {
      case 'ocean':
        args = [
          '-n',
          'synth',
          'brownnoise',
          'synth',
          'pinknoise',
          'mix',
          'synth',
          'sine',
          'amod',
          '0.1',
          '10'
        ]
        break
      case 'white':
        args = [
          '-n',
          'synth',
          'whitenoise'
        ]
        break
    }

    return args
  }
}
