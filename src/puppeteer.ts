import puppeteer from 'puppeteer'
import { PuppeteerResult, PushImageConfig } from './type'
import {
  failSpinner,
  infoSpinner,
  reStartSpinner,
  startSpinner,
  succeedSpinner,
} from './spinner'

export async function puppeteerOperation(
  userName: string,
  password: string,
  config: PushImageConfig
): Promise<PuppeteerResult> {
  const spinner = startSpinner('start puppeteer')
  const browser = await puppeteer.launch({
    headless: 'new',
  })
  const page = await browser.newPage()
  await page.goto(config.ksPageUrl)
  infoSpinner(spinner, 'Open the login page')
  const usernameInput = await page.waitForSelector('input[name="username"]')
  await usernameInput!.type(userName)
  const passwordInput = await page.waitForSelector('input[name="password"]')
  await passwordInput!.type(password)
  page.keyboard.press('Enter')
  const activityTab = await page.waitForSelector('a ::-p-text(活动)')
  infoSpinner(spinner, 'Successfully enter the page')
  activityTab!.click()
  const runButton = await page.waitForSelector('button ::-p-text(运行)')
  runButton!.click()
  const confrimButton = await page.waitForSelector('button ::-p-text(确定)')
  confrimButton!.click()
  reStartSpinner(
    spinner,
    'Run the workflow and wait for the network to be free...'
  )
  try {
    await page.waitForNetworkIdle({
      idleTime: config.networkIdleTime || 6000,
      timeout: config.networkTimeout || 60000,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    failSpinner(spinner, err.message)
    throw new Error(
      "The input network idle time of the pusheter's waitForNetworkIdle method is low"
    )
  }

  const firstRowRunStatus = await page.waitForXPath(
    '//*[@id="root"]/div/div[2]/div[2]/div[3]/div/div/div[2]/table/tbody/tr/td[1]'
  )
  const firstRowRunId = await page.waitForXPath(
    '//*[@id="root"]/div/div[2]/div[2]/div[3]/div/div/div[2]/table/tbody/tr/td[2]'
  )
  infoSpinner(spinner, 'Start taking a screenshot')
  const bufferData = await page.screenshot({ fullPage: true })
  const runStatuselEmentHandle = await firstRowRunStatus!.getProperty(
    'textContent'
  )
  const runStatuselEmentContent = await runStatuselEmentHandle.jsonValue()
  const runIdElementHandle = await firstRowRunId!.getProperty('textContent')
  const runIdElementContent = await runIdElementHandle.jsonValue()
  succeedSpinner(
    spinner,
    'Successfully run the workflow and get the information'
  )
  await browser.close()
  return {
    pageBuffer: bufferData,
    result: {
      runStatus: runStatuselEmentContent!,
      runId: runIdElementContent!,
    },
  }
}
