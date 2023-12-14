import {createHash} from 'crypto'
export function getMD5ByBuffer(binaryData: Buffer) {
  return createHash('md5').update(binaryData).digest('hex')
}
