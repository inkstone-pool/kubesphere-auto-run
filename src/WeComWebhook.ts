import axios from 'axios'
import { getMD5ByBuffer } from './util'
import { PuppeteerResult } from './type'
import { failSpinner, startSpinner, succeedSpinner } from './spinner'
// 发送图片到企业微信 Webhook
export function sendImageToWeComWebhook(
  webhookURL: string,
  bufferData?: Buffer
) {
  return async (puppeteerResult: Partial<PuppeteerResult>) => {
    const spinner = startSpinner('start WeComWebhook')
    if (!bufferData) {
      bufferData = puppeteerResult.pageBuffer || Buffer.from([])
    }
    const md5 = getMD5ByBuffer(bufferData)
    const base64Data = bufferData.toString('base64')
    const payload = {
      msgtype: 'image',
      image: {
        base64: base64Data,
        md5: md5,
      },
    }
    try {
      const response = await axios.post(webhookURL, payload)
      succeedSpinner(
        spinner,
        `Screenshot sending successfully:${JSON.stringify(response.data)}`
      )
    } catch (error) {
      failSpinner(
        spinner,
        `Screenshot sending failed:${(error as Error).message}`
      )
    }
  }
}
// 发送信息到企业微信 Webhook
export function sendMessageToWeComWebhook(
  webhookURL: string,
  textContent: {
    content: string
    mentioned_list: string[]
    mentioned_mobile_list: string[]
  }
) {
  return async (puppeteerResult: Partial<PuppeteerResult>) => {
    const spinner = startSpinner('start MessageWeComWebhook')
    const payload = {
      msgtype: 'text',
      text: {
        content: `Run result:${puppeteerResult.result}\n${textContent.content}`,
        mentioned_list: textContent.mentioned_list,
        mentioned_mobile_list: textContent.mentioned_mobile_list,
      },
    }

    try {
      const response = await axios.post(webhookURL, payload)
      succeedSpinner(
        spinner,
        `Message sending successfully:${JSON.stringify(response.data, null, 2)}`
      )
    } catch (error) {
      failSpinner(spinner, `Message sending failed:${(error as Error).message}`)
    }
  }
}
