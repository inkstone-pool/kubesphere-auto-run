import { PostHandle, PuppeteerResult } from "./type"

export class PostManager {
  constructor(
    public postHandles: ((
      puppeteerResult: Partial<PuppeteerResult>
    ) => void)[] = []
  ) {}
  use(postFn: PostHandle) {
    this.postHandles.push(postFn)
    return this.postHandles.length - 1
  }
  eject(id: number) {
    if (this.postHandles[id]) {
      this.postHandles.splice(id, 1)
    }
  }
  clear() {
    if (this.postHandles) {
      this.postHandles = []
    }
  }
  dispatchAll(puppeteerResult: PuppeteerResult) {
    this.postHandles.forEach((postHandle) => {
      postHandle(puppeteerResult)
    })
  }
}
