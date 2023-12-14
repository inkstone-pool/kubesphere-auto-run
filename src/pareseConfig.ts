import fs from 'node:fs'
import path from 'node:path'

export function getLoginInfo(): Promise<{
  userName: string
  password: string
}> {
  const ksLoginConfigPath = path.join(process.cwd(), 'kubesphereconfig.json')
  return new Promise((resolve, reject) => {
    fs.readFile(ksLoginConfigPath, 'utf8', (err, data) => {
      if (err) {
        console.warn(
          '请检查根目录kubesphereconfig.json文件,或者使用kubesphere-cli --init生成模版'
        )
        reject()
      } else {
        const { userName, password } = JSON.parse(data)
        if (userName && password) {
          resolve({ userName, password })
        } else {
          console.warn('ks账号密码不存在')
          reject()
        }
      }
    })
  })
}
