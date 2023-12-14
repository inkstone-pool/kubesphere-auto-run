import ora, { Ora } from 'ora'

export function startSpinner(text: string) {
  return ora({ spinner: 'runner' }).start(text)
}

export function succeedSpinner(spinner: Ora, text: string) {
  spinner.succeed(text)
}

export function failSpinner(spinner: Ora, text: string) {
  spinner.fail(text)
}
export function infoSpinner(spinner: Ora, text: string) {
  spinner.info(text)
}
export function reStartSpinner(spinner: Ora, text: string) {
  spinner.start(text)
}
