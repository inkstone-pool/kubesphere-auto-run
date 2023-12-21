export interface PuppeteerResult {
  pageBuffer: Buffer
  result: {
    runStatus: string
    runId: string
  }
}
export type PostHandle = (
  puppeteerResult: Partial<PuppeteerResult>
) => void | Promise<void>
export interface PushImageConfig {
  ksPageUrl: string
  networkIdleTime?: number
  networkTimeout?: number
}
