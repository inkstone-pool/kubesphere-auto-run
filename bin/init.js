import fs from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import inquirer from 'inquirer'

export const handleGenerateConfig = () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const templateFilePath = path.join(__dirname, 'template.json')
  const configFilePath = process.cwd() + '/kubesphereconfig.json'
  if (fs.existsSync(configFilePath)) {
    inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'keepConfig',
          message: '是否保留kubesphereconfig.json文件?',
          default: true,
        },
      ])
      .then((answers) => {
        if (!answers.keepConfig) {
          // 如果用户选择不保留，生成一份json内容并覆盖config.json文件
          const templateData = fs.readFileSync(templateFilePath, 'utf8')
          fs.writeFileSync(configFilePath, templateData)
        } else {
          // 用户选择保留，退出进程
          process.exit(0)
        }
      })
  } else {
    const templateData = fs.readFileSync(templateFilePath, 'utf8')
    fs.writeFileSync(configFilePath, templateData)
  }
}
