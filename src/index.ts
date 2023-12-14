import { getLoginInfo } from './pareseConfig'
import { PostManager } from './postManager'
import { puppeteerOperation } from './puppeteer'
import { PostHandle, PushImageConfig } from './type'

export const runKubeSpherePage = async (
  config: PushImageConfig,
  postHandles?: PostHandle[]
) => {
  const { userName, password } = await getLoginInfo()
  const result = await puppeteerOperation(userName, password, config)
  if (postHandles) {
    const postmanager = new PostManager(postHandles)
    postmanager.dispatchAll(result)
  }
  return result
}

